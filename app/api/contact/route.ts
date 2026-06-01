import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "../../lib/rateLimit";
import { saveInbound } from "../../lib/emailStore";

export async function POST(req: NextRequest) {
  // レートリミット: 1IP あたり 5回/分（スパム防止）
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const allowed = await checkRateLimit(ip, "contact", 5, 60);
  if (!allowed) {
    return NextResponse.json(
      { error: "送信回数が多すぎます。しばらく待ってから再試行してください。" },
      { status: 429 }
    );
  }

  try {
    const { name, email, type, message } = await req.json();

    // バリデーション
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "必須項目が未入力です" }, { status: 400 });
    }
    if (name.length > 100 || email.length > 200 || message.length > 2000) {
      return NextResponse.json({ error: "入力内容が長すぎます" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "メールアドレスの形式が正しくありません" }, { status: 400 });
    }

    // /dev の受信箱に保存
    await saveInbound({
      from:      `${name} <${email}>`,
      to:        "contact@saferbite.org",
      subject:   `[お問い合わせ] ${type ?? "一般"} — ${name}`,
      textBody:  `種別: ${type ?? "未選択"}\n差出人: ${name} <${email}>\n\n${message}`,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}
