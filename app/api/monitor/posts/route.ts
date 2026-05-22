import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getPosts } from "@/app/lib/monitorStore";
import { checkRateLimit } from "@/app/lib/rateLimit";

/**
 * GET /api/monitor/posts
 * /dev ページ専用。ログイン済みセッションのみ許可。
 */
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // レートリミット: ログイン済みユーザーでも過剰ポーリング防止（60回/分）
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const allowed = await checkRateLimit(ip, "monitor-posts", 60, 60);
  if (!allowed) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  try {
    const posts = await getPosts();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
