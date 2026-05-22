import { NextRequest, NextResponse } from "next/server";
import { ingestPost, type MonitorPost } from "@/app/lib/monitorStore";

/**
 * POST /api/monitor/ingest
 * x_monitor.py から呼ばれる内部エンドポイント。
 * Authorization: Bearer {MONITOR_SECRET} が必要。
 */
export async function POST(req: NextRequest) {
  // ── 認証 ────────────────────────────────────────────────
  const secret = process.env.MONITOR_SECRET;
  const auth   = req.headers.get("Authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── ボディ検証 ──────────────────────────────────────────
  let posts: Omit<MonitorPost, "status">[];
  try {
    const body = await req.json();
    posts = body.posts;
    if (!Array.isArray(posts) || posts.length === 0) {
      return NextResponse.json({ error: "posts must be a non-empty array" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // ── 保存 ────────────────────────────────────────────────
  const results = await Promise.all(posts.map((p) => ingestPost(p)));
  const inserted = results.filter((r) => r === "inserted").length;
  const skipped  = results.filter((r) => r === "skipped").length;

  return NextResponse.json({ ok: true, inserted, skipped });
}
