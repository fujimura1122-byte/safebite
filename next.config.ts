import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── セキュリティヘッダー（Vercelミドルウェアと二重保護） ──────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // クリックジャッキング防止
          { key: "X-Frame-Options",         value: "DENY" },
          // MIMEスニッフィング防止
          { key: "X-Content-Type-Options",  value: "nosniff" },
          // XSS フィルター（レガシーブラウザ向け）
          { key: "X-XSS-Protection",        value: "1; mode=block" },
          // リファラー情報の最小化
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          // 不要なブラウザ機能を無効化
          { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // HTTPS 強制（HSTS）
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      // /dev は追加でキャッシュ禁止（セッション情報の漏洩防止）
      {
        source: "/dev(.*)",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
          { key: "Pragma",        value: "no-cache" },
        ],
      },
    ];
  },
};

export default nextConfig;
