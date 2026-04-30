import Redis from "ioredis";
import { NextResponse } from "next/server";

const VALID_KEYS = ["ai_checks", "reports_submitted", "sos_generated"] as const;

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
    const [checks, reports, sos] = await Promise.all([
      redis.get("ai_checks"),
      redis.get("reports_submitted"),
      redis.get("sos_generated"),
    ]);
    return NextResponse.json({
      ai_checks: Number(checks ?? 0),
      reports_submitted: Number(reports ?? 0),
      sos_generated: Number(sos ?? 0),
    });
  } catch {
    return NextResponse.json({ ai_checks: 0, reports_submitted: 0, sos_generated: 0 });
  }
}

export async function POST(req: Request) {
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
