import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Resend } from "resend";
import { saveSent } from "@/app/lib/emailStore";
import { checkRateLimit } from "@/app/lib/rateLimit";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * POST /api/email/send
 * Resend 経由で contact@saferbite.org から送信。
 * NextAuth ログイン必須。
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ip      = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const allowed = await checkRateLimit(ip, "email-send", 10, 60);
  if (!allowed) return NextResponse.json({ error: "Rate limited" }, { status: 429 });

  let to: string, subject: string, textBody: string;
  try {
    const body = await req.json();
    to       = String(body.to       ?? "").trim();
    subject  = String(body.subject  ?? "").trim();
    textBody = String(body.textBody ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!to || !subject || !textBody) {
    return NextResponse.json({ error: "to / subject / textBody が必要です" }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from:    "SafeBite <contact@saferbite.org>",
    to:      [to],
    subject,
    text:    textBody,
  });

  if (error) {
    console.error("[email/send] Resend error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await saveSent({
    to,
    subject,
    textBody,
    sentAt:   new Date().toISOString(),
    resendId: data?.id,
  });

  return NextResponse.json({ ok: true, resendId: data?.id });
}
