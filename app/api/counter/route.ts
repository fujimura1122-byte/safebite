import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const runtime = "edge";

const VALID_KEYS = ["ai_checks", "reports_submitted", "sos_generated"] as const;

export async function GET() {
  try {
    const [checks, reports, sos] = await Promise.all([
      kv.get<number>("ai_checks"),
      kv.get<number>("reports_submitted"),
      kv.get<number>("sos_generated"),
    ]);
    return NextResponse.json({
      ai_checks: checks ?? 0,
      reports_submitted: reports ?? 0,
      sos_generated: sos ?? 0,
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
    const count = await kv.incr(key);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
