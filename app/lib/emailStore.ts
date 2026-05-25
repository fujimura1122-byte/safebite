/**
 * emailStore.ts
 * contact@saferbite.org のメール保存・取得（Redis）
 *
 * Keys:
 *   email:inbox:ids   → List<id>  新着順 (LPUSH), 最大500件
 *   email:sent:ids    → List<id>  送信済 (LPUSH), 最大500件
 *   email:{id}        → JSON string (InboundEmail | OutboundEmail)
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

// ── 型定義 ────────────────────────────────────────────────────────────────────

export interface InboundEmail {
  id:         string;
  direction:  "inbound";
  from:       string;
  to:         string;
  subject:    string;
  textBody:   string;
  htmlBody?:  string;
  receivedAt: string;
  read:       boolean;
}

export interface OutboundEmail {
  id:        string;
  direction: "outbound";
  to:        string;
  subject:   string;
  textBody:  string;
  sentAt:    string;
  resendId?: string;
}

// ── Redis キー ────────────────────────────────────────────────────────────────

const INBOX_LIST = "email:inbox:ids";
const SENT_LIST  = "email:sent:ids";
const EMAIL_KEY  = (id: string) => `email:${id}`;
const MAX_EMAILS = 500;

// ── 受信 ─────────────────────────────────────────────────────────────────────

export async function saveInbound(
  email: Omit<InboundEmail, "id" | "direction" | "read">
): Promise<InboundEmail> {
  const redis = getRedis();
  const id    = `inb_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const full: InboundEmail = { ...email, id, direction: "inbound", read: false };
  await redis.set(EMAIL_KEY(id), JSON.stringify(full));
  await redis.lpush(INBOX_LIST, id);
  await redis.ltrim(INBOX_LIST, 0, MAX_EMAILS - 1);
  return full;
}

export async function getInbox(): Promise<InboundEmail[]> {
  const redis = getRedis();
  const ids   = await redis.lrange(INBOX_LIST, 0, MAX_EMAILS - 1);
  if (!ids.length) return [];
  const jsons = await redis.mget(...ids.map(EMAIL_KEY));
  return jsons
    .filter((j): j is string => j !== null)
    .map((j) => JSON.parse(j) as InboundEmail);
}

export async function markRead(id: string): Promise<boolean> {
  const redis = getRedis();
  const raw   = await redis.get(EMAIL_KEY(id));
  if (!raw) return false;
  const email: InboundEmail = JSON.parse(raw);
  email.read = true;
  await redis.set(EMAIL_KEY(id), JSON.stringify(email));
  return true;
}

// ── 送信 ─────────────────────────────────────────────────────────────────────

export async function saveSent(
  email: Omit<OutboundEmail, "id" | "direction">
): Promise<OutboundEmail> {
  const redis = getRedis();
  const id    = `snt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const full: OutboundEmail = { ...email, id, direction: "outbound" };
  await redis.set(EMAIL_KEY(id), JSON.stringify(full));
  await redis.lpush(SENT_LIST, id);
  await redis.ltrim(SENT_LIST, 0, MAX_EMAILS - 1);
  return full;
}

export async function getSent(): Promise<OutboundEmail[]> {
  const redis = getRedis();
  const ids   = await redis.lrange(SENT_LIST, 0, MAX_EMAILS - 1);
  if (!ids.length) return [];
  const jsons = await redis.mget(...ids.map(EMAIL_KEY));
  return jsons
    .filter((j): j is string => j !== null)
    .map((j) => JSON.parse(j) as OutboundEmail);
}

export async function getUnreadCount(): Promise<number> {
  const inbox = await getInbox();
  return inbox.filter((e) => !e.read).length;
}
