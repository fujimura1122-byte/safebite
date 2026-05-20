import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dev")) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !isValidAuth(authHeader)) {
      return new NextResponse("認証が必要です", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="SafeBite Dev"' },
      });
    }
  }
  return NextResponse.next();
}

function isValidAuth(authHeader: string): boolean {
  try {
    const base64 = authHeader.replace("Basic ", "");
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const colonIdx = decoded.indexOf(":");
    if (colonIdx === -1) return false;
    const password = decoded.slice(colonIdx + 1);
    const validPassword = process.env.DEV_PASSWORD ?? "safebite2026dev";
    return password === validPassword;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ["/dev/:path*"],
};
