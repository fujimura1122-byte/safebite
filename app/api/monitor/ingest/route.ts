import { NextRequest, NextResponse } from "next/server";
import { ingestPost, type MonitorPost } from "@/app/lib/monitorStore";
import { checkRateLimit } from "@/app/lib/rateLimit";

const MAX_POSTS_PER_REQUEST = 50;
const FIELD_LIMITS = { id: 64, url: 512, author: 100, text: 1000, category: 50 };

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

  // ── レートリミット: IPあたり 30回/分（スクリプトの多重実行防止）──
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const allowed = await checkRateLimit(ip, "monitor-ingest", 30, 60);
  if (!allowed) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  // ── ボディ検証 ──────────────────────────────────────────
  let posts: Omit<MonitorPost, "status">[];
  try {
    const body = await req.json();
    posts = body.posts;
    if (!Array.isArray(posts) || posts.length === 0) {
      return NextResponse.json({ error: "posts must be a non-empty array" }, { status: 400 });
    }
    if (posts.length > MAX_POSTS_PER_REQUEST) {
      return NextResponse.json(
        { error: `Too many posts. Max ${MAX_POSTS_PER_REQUEST} per request.` },
        { status: 400 }
      );
    }
    // フィールドレベルバリデーション
    for (const p of posts) {
      // Tweet ID は数字のみ（Redis キーインジェクション防止）
      if (typeof p.id !== "string" || !/^\d{1,64}$/.test(p.id)) {
        return NextResponse.json({ error: "Invalid post.id" }, { status: 400 });
      }
      // URL は https://x.com または https://twitter.com のみ許可
      if (
        typeof p.url !== "string" ||
        !/^https:\/\/(x\.com|twitter\.com)\//.test(p.url) ||
        p.url.length > FIELD_LIMITS.url
      ) {
        return NextResponse.json({ error: "Invalid post.url" }, { status: 400 });
      }
      if (typeof p.author !== "string" || p.author.length > FIELD_LIMITS.author) {
        return NextResponse.json({ error: "Invalid post.author" }, { status: 400 });
      }
      if (typeof p.text !== "string" || p.text.length > FIELD_LIMITS.text) {
        return NextResponse.json({ error: "Invalid post.text" }, { status: 400 });
      }
      if (typeof p.category !== "string" || p.category.length > FIELD_LIMITS.category) {
        return NextResponse.json({ error: "Invalid post.category" }, { status: 400 });
      }
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
