/**
 * monitorStore.ts
 * 闇バイト監視データの Redis ストア
 *
 * Keys:
 *   monitor:ids          → List<tweetId>  新着順 (LPUSH), 最大200件
 *   monitor:post:{id}    → JSON string (MonitorPost)
 */

import Redis from "ioredis";

let _redis: Redis | null = null;

function getRedis(): Redis {
  if (!_redis) {
    _redis = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
      lazyConnect: true,
    });
  }
  return _redis;
}

// ── 型定義 ─────────────────────────────────────────────────────────────────

export type PostStatus = "未対応" | "通報済" | "誤報";

export interface MonitorPost {
  id:          string;   // tweet ID (数字列)
  url:         string;   // https://x.com/user/status/{id}
  author:      string;   // @username
  text:        string;   // 本文（最大300文字）
  category:    string;   // クエリラベル
  detectedAt:  string;   // ISO 8601
  status:      PostStatus;
  reportRef?:  string;   // IHC 参照番号
}

const POSTS_LIST = "monitor:ids";
const POST_KEY   = (id: string) => `monitor:post:${id}`;
const MAX_POSTS  = 200;

// ── 操作 ──────────────────────────────────────────────────────────────────

/** 新着投稿を保存（既存の場合はスキップ） */
export async function ingestPost(
  post: Omit<MonitorPost, "status">
): Promise<"inserted" | "skipped"> {
  const redis = getRedis();
  const key   = POST_KEY(post.id);

  // 既存チェック
  const exists = await redis.exists(key);
  if (exists) return "skipped";

  const full: MonitorPost = { ...post, status: "未対応" };
  await redis.set(key, JSON.stringify(full));
  await redis.lpush(POSTS_LIST, post.id);
  await redis.ltrim(POSTS_LIST, 0, MAX_POSTS - 1);
  return "inserted";
}

/** 全投稿を新着順で取得 */
export async function getPosts(): Promise<MonitorPost[]> {
  const redis = getRedis();
  const ids   = await redis.lrange(POSTS_LIST, 0, MAX_POSTS - 1);
  if (!ids.length) return [];

  const jsons = await redis.mget(...ids.map(POST_KEY));
  return jsons
    .filter((j): j is string => j !== null)
    .map((j) => JSON.parse(j) as MonitorPost);
}

/** ステータス更新 */
export async function updateStatus(
  id:        string,
  status:    PostStatus,
  reportRef?: string,
): Promise<boolean> {
  const redis = getRedis();
  const raw   = await redis.get(POST_KEY(id));
  if (!raw) return false;

  const post: MonitorPost = JSON.parse(raw);
  post.status = status;
  if (reportRef !== undefined) post.reportRef = reportRef;
  await redis.set(POST_KEY(id), JSON.stringify(post));
  return true;
}
