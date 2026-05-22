import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getPosts } from "@/app/lib/monitorStore";

/**
 * GET /api/monitor/posts
 * /dev ページ専用。ログイン済みセッションのみ許可。
 */
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await getPosts();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
