import { signIn } from "@/auth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Dev Login | SafeBite", robots: "noindex,nofollow" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // すでにログイン済みならダッシュボードへ
  const session = await auth();
  if (session) redirect("/dev");

  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* ロゴ */}
        <div className="text-center mb-8">
          <div className="text-2xl font-black mb-1">
            <span className="text-red-500">Safe</span>
            <span className="text-white">Bite</span>
          </div>
          <p className="text-slate-500 text-sm">Dev Dashboard</p>
        </div>

        {/* カード */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h1 className="text-white font-bold text-lg mb-1">開発者ログイン</h1>
          <p className="text-slate-400 text-xs mb-6">
            許可されたGoogleアカウントのみアクセス可能です
          </p>

          {/* エラー表示 */}
          {error && (
            <div className="bg-red-950 border border-red-800 rounded-xl px-4 py-3 mb-5">
              <p className="text-red-400 text-xs font-bold">
                {error === "AccessDenied"
                  ? "❌ このGoogleアカウントはアクセス権限がありません"
                  : "❌ 認証エラーが発生しました。再試行してください"}
              </p>
            </div>
          )}

          {/* Google ログインボタン（Server Action） */}
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dev" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-bold px-4 py-3 rounded-xl transition-all text-sm"
            >
              {/* Google アイコン */}
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Googleアカウントでログイン
            </button>
          </form>

          <p className="text-slate-600 text-xs text-center mt-4">
            セキュリティのため、許可されたアカウント以外は<br />アクセスを完全にブロックします
          </p>
        </div>

        <p className="text-slate-700 text-xs text-center mt-4">
          SafeBite Dev — Private Access Only
        </p>
      </div>
    </div>
  );
}
