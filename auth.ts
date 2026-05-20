import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

/**
 * 許可するGmailアドレス（Vercel環境変数 ALLOWED_DEV_EMAIL で設定）
 * 一致しない場合はサインイン拒否
 */
const ALLOWED_EMAIL = process.env.ALLOWED_DEV_EMAIL ?? "";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          // 毎回アカウント選択画面を出す（誤ログイン防止）
          prompt: "select_account",
          access_type: "online",
        },
      },
    }),
  ],

  callbacks: {
    // ✅ 特定メールアドレスのみ許可
    async signIn({ user }) {
      if (!ALLOWED_EMAIL) return false;
      return user.email === ALLOWED_EMAIL;
    },
    // セッションにemailのみ含める（最小権限）
    async session({ session }) {
      return {
        ...session,
        user: { email: session.user?.email ?? "" },
      };
    },
  },

  pages: {
    signIn: "/dev/login",
    error:  "/dev/login",  // エラーもログインページへ
  },

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,  // 8時間で自動ログアウト
  },

  // CSRF・セキュリティ設定はNextAuth組み込み（useSecureCookies等）
});
