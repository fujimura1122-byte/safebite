import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "../../lib/rateLimit";
import { saveInbound } from "../../lib/emailStore";

// スパムキーワード（英語スパムに多いフレーズ）
const SPAM_KEYWORDS = [
  "casino", "viagra", "crypto", "bitcoin", "SEO service",
  "buy followers", "cheap loan", "click here", "make money fast",
  "work from home", "100% free", "limited offer",
];

// URL を数える正規表現
const URL_PATTERN = /https?:\/\/[^\s]+/gi;

function isSpam(text: string): { spam: boolean; reason: string } {
  // URL が3個以上含まれる
  const urls = text.match(URL_PATTERN) ?? [];
  if (urls.length >= 3) {
    return { spam: true, reason: "too_many_urls" };
  }

  // スパムキーワードが含まれる
  const lower = text.toLowerCase();
  for (const kw of SPAM_KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) {
      return { spam: true, reason: `keyword:${kw}` };
    }
  }

  // 同じ文字の繰り返し（aaaaaaa など 10文字以上）
  if (/(.)\1{9,}/.test(text)) {
    return { spam: true, reason: "repeated_chars" };
  }

  return { spam: false, reason: "" };
}

export async function POST(req: NextRequest) {
  // ① レートリミット: 1IP あたり 5回/時（スパム防止）
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const allowed = await checkRateLimit(ip, "contact", 5, 3600);
  if (!allowed) {
    return NextResponse.json(
      { error: "送信回数が多すぎます。しばらく待ってから再試行してください。" },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, type, message } = body as Record<string, string>;

    // ② ハニーポット（ボットは hidden の "website" フィールドを埋める）
    if (body.website) {
      // ボット判定 — 正常レスポンスを返してボットを混乱させる
      return NextResponse.json({ success: true });
    }

    // ③ 基本バリデーション
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "必須項目が未入力です" }, { status: 400 });
    }
    if (name.length > 100 || email.length > 200 || message.length > 2000) {
      return NextResponse.json({ error: "入力内容が長すぎます" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "メールアドレスの形式が正しくありません" }, { status: 400 });
    }

    // ④ スパム検出（本文 + 名前）
    const spamCheck = isSpam(`${name} ${message}`);
    if (spamCheck.spam) {
      console.warn("[Contact] Spam blocked:", spamCheck.reason, { ip, email });
      // ボットと同様、正常レスポンスを返して再送を防ぐ
      return NextResponse.json({ success: true });
    }

    // ⑤ /dev の受信箱に保存
    await saveInbound({
      from:       `${name} <${email}>`,
      to:         "contact@saferbite.org",
      subject:    `[お問い合わせ] ${type ?? "一般"} — ${name}`,
      textBody:   `種別: ${type ?? "未選択"}\n差出人: ${name} <${email}>\n\n${message}`,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}
