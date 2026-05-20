import { handlers } from "@/auth";

// NextAuth v5 App Router ハンドラー
// GET: Google OAuth リダイレクト・コールバック処理
// POST: サインイン・サインアウト処理
export const { GET, POST } = handlers;
