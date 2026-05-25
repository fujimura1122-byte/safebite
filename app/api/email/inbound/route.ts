import { NextRequest, NextResponse } from "next/server";
import { saveInbound } from "@/app/lib/emailStore";
import { checkRateLimit } from "@/app/lib/rateLimit";

/**
 * POST /api/email/inbound
 * Cloudflare Email Worker からの受信webhookエンドポイント。
 * Bearer トークン認証（EMAIL_INBOUND_SECRET）のみ許可。
 */
export async function POST(req: NextRequest) {
  // Bearer認証
  const auth   = req.headers.get("authorization");
  const secret = process.env.EMAIL_INBOUND_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // レートリミット（Cloudflare Worker のIPでかかることは少ないが念のため）
  const ip      = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const allowed = await checkRateLimit(ip, "email-inbound", 30, 60);
  if (!allowed) return NextResponse.json({ error: "Rate limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { from, to, subject, textBody, htmlBody } = body as Record<string, string>;
  if (!from || !subject) {
    return NextResponse.json({ error: "from and subject are required" }, { status: 400 });
  }

  const email = await saveInbound({
    from:       String(from).slice(0, 200),
    to:         String(to ?? "contact@saferbite.org").slice(0, 200),
    subject:    String(subject || "(件名なし)").slice(0, 500),
    textBody:   String(textBody ?? "").slice(0, 50000),
    htmlBody:   htmlBody ? String(htmlBody).slice(0, 100000) : undefined,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, id: email.id });
}
