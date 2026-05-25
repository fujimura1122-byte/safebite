import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getInbox, getSent, markRead } from "@/app/lib/emailStore";
import { checkRateLimit } from "@/app/lib/rateLimit";

/**
 * GET /api/email/inbox
 * 受信箱＋送信済みを返す。NextAuth ログイン必須。
 */
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ip      = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const allowed = await checkRateLimit(ip, "email-inbox", 60, 60);
  if (!allowed) return NextResponse.json({ error: "Rate limited" }, { status: 429 });

  const [inbox, sent] = await Promise.all([getInbox(), getSent()]);
  const unread = inbox.filter((e) => !e.read).length;
  return NextResponse.json({ inbox, sent, unread });
}

/**
 * PATCH /api/email/inbox
 * メールを既読にする。
 */
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const ok = await markRead(id);
  return NextResponse.json({ ok });
}
