import Redis from "ioredis";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "../../lib/rateLimit";

const VALID_KEYS = ["ai_checks", "reports_submitted", "sos_generated", "ihc_verified"] as const;

let _redis: Redis | null = null;
function getRedis() {
  if (!_redis) {
    _redis = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
      lazyConnect: true,
    });
  }
  return _redis;
}

export async function GET() {
  try {
    const redis = getRedis();
    const [checks, reports, sos, ihc] = await Promise.all([
      redis.get("ai_checks"),
      redis.get("reports_submitted"),
      redis.get("sos_generated"),
      redis.get("ihc_verified"),
    ]);
    return NextResponse.json({
      ai_checks: Number(checks ?? 0),
      reports_submitted: Number(reports ?? 0),
      sos_generated: Number(sos ?? 0),
      ihc_verified: Number(ihc ?? 0),
    });
  } catch {
    return NextResponse.json({ ai_checks: 0, reports_submitted: 0, sos_generated: 0 });
  }
}

export async function POST(req: NextRequest) {
  // レートリミット: 1IP あたり 30回/分（各AI操作1回分のインクリメント）
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const allowed = await checkRateLimit(ip, "counter", 30, 60);
  if (!allowed) {
    return NextResponse.json({ error: "rate limited" }, { status: 429 });
  }

  try {
    const { key } = await req.json();
    if (!VALID_KEYS.includes(key)) {
      return NextResponse.json({ error: "invalid key" }, { status: 400 });
    }
    const redis = getRedis();
    const count = await redis.incr(key);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
