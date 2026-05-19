import Redis from "ioredis";

let _redis: Redis | null = null;

function getRedis(): Redis {
  if (!_redis) {
    _redis = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
      maxRetriesPerRequest: 1,
      connectTimeout: 3000,
      lazyConnect: true,
    });
  }
  return _redis;
}

/**
 * IP + action ベースのレートリミット。
 * @returns true = リクエスト許可 / false = 制限超過
 */
export async function checkRateLimit(
  ip: string,
  action: string,
  maxRequests = 10,
  windowSeconds = 60,
): Promise<boolean> {
  const key = `rl:${action}:${ip}`;
  try {
    const redis = getRedis();
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, windowSeconds);
    return count <= maxRequests;
  } catch {
    // Redis 障害時はフェイルオープン（リクエストを通す）
    return true;
  }
}
