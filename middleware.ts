import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * セキュリティミドルウェア
 *
 * 1. /dev/* は Google OAuth 認証必須（許可メールアドレスのみ）
 * 2. 全ページにセキュリティヘッダーを付与
 */
export default auth((req: NextRequest & { auth: unknown }) => {
  const { pathname } = req.nextUrl;

  // /dev/login は認証不要（ループ防止）
  // /api/auth/* は NextAuth 内部ルートのため除外
  if (pathname.startsWith("/dev") && !pathname.startsWith("/dev/login")) {
    if (!(req as { auth: unknown }).auth) {
      const loginUrl = new URL("/dev/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  const res = NextResponse.next();

  // ── セキュリティヘッダー（全ルート） ──────────────────────────
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  return res;
});

export const config = {
  // 静的ファイル・Next.js 内部ルートは除外
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
