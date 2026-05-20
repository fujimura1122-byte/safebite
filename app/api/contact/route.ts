import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, type, message } = await req.json();

    // バリデーション
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "必須項目が未入力です" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "メールアドレスの形式が正しくありません" }, { status: 400 });
    }

    // ログ出力（本番ではここにResend / SendGrid等のメール送信処理を追加する）
    console.log("[Contact Form]", {
      timestamp: new Date().toISOString(),
      name,
      email,
      type,
      message: message.slice(0, 100) + (message.length > 100 ? "..." : ""),
    });

    /*
     * ── メール送信の実装例（Resend を使う場合）──────────────────────
     * import { Resend } from "resend";
     * const resend = new Resend(process.env.RESEND_API_KEY);
     * await resend.emails.send({
     *   from: "SafeBite <noreply@safebite.jp>",
     *   to: "info@safebite.jp",
     *   subject: `[SafeBite] ${type} — ${name}`,
     *   text: `差出人: ${name} <${email}>\n種別: ${type}\n\n${message}`,
     * });
     * ────────────────────────────────────────────────────────────────
     */

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}
