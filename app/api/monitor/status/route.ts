import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateStatus, type PostStatus } from "@/app/lib/monitorStore";
import { checkRateLimit } from "@/app/lib/rateLimit";

/**
 * PATCH /api/monitor/status
 * 投稿のステータス（未対応/通報済/誤報）と参照番号を更新する。
 * ログイン済みセッションのみ許可。
 */
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // レートリミット: ステータス更新は 60回/分まで
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const allowed = await checkRateLimit(ip, "monitor-status", 60, 60);
  if (!allowed) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  let id: string, status: PostStatus, reportRef: string | undefined;
  try {
    const body = await req.json();
    id        = body.id;
    status    = body.status;
    reportRef = body.reportRef;

    if (!id || !["未対応", "通報済", "誤報"].includes(status)) {
      return NextResponse.json({ error: "id and valid status required" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const ok = await updateStatus(id, status, reportRef);
  if (!ok) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
