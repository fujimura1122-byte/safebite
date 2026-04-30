import type { Metadata } from "next";
import Link from "next/link";
import { terms, dangerConfig } from "./terms";

export const metadata: Metadata = {
  title: "闇バイト隠語辞典｜UD・ホワ案・受け子・出し子の意味を解説 | SafeBite",
  description:
    "「UD」「ホワ案」「受け子」「出し子」「叩き」など、闇バイト・特殊詐欺で使われる隠語の意味と危険性を徹底解説。知らずに関わってしまう前に確認してください。",
  keywords:
    "UD 意味,ホワ案 意味,受け子 バイト,出し子 意味,叩き 闇バイト,闇バイト 隠語,架け子 意味,書き子 意味,飛ばし 意味,名義貸し 意味,テレグラム 闇バイト",
};

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-slate-950 text-white py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-black text-lg">
            <span className="text-red-500">Safe</span>
            <span className="text-white">Bite</span>
          </Link>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← トップページへ
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
            SEO・啓発コンテンツ
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight mb-4">
            闇バイト隠語辞典
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-6">
            「UD」「ホワ案」「受け子」など、<br />
            SNSで飛び交う<strong className="text-slate-800">闇バイトの隠語</strong>をすべて解説します。
          </p>
          <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-5 text-sm text-red-700 leading-relaxed text-left">
            <strong className="block mb-2">⚠️ これらの言葉を使った求人には絶対に応募しないでください</strong>
            隠語でカモフラージュされた「バイト」の実態は犯罪です。知らずに関与した場合でも逮捕・起訴される事例が多数報告されています。
          </div>
        </div>

        {/* 用語カード一覧 */}
        <div className="flex flex-col gap-3 mb-12">
          {terms.map((t) => {
            const d = dangerConfig[t.danger];
            return (
              <Link
                key={t.slug}
                href={"/glossary/" + t.slug}
                className="group border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-white rounded-2xl p-5 flex items-start gap-4 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h2 className="text-lg font-black text-slate-900 group-hover:text-red-600 transition-colors">{t.word}</h2>
                    <span className="text-xs text-slate-400">（{t.read}）</span>
                    <span className={"text-xs font-bold px-2 py-0.5 rounded-full border " + d.cls}>{d.label}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{t.short}</p>
                </div>
                <span className="text-slate-300 group-hover:text-slate-500 transition-colors text-sm mt-1 flex-shrink-0">→</span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-slate-950 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-black text-white mb-3">怪しい求人を見つけたら？</h3>
          <p className="text-slate-400 mb-6 text-sm leading-relaxed">
            SafeBiteのAI危険度チェッカーで<br />すぐに分析できます（無料・匿名）
          </p>
          <Link
            href="/#checker"
            className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all"
          >
            無料で危険度チェックする →
          </Link>
          <p className="text-xs text-slate-500 mt-3">入力した文章はサーバーに保存されません</p>
        </div>
      </main>

      <footer className="bg-slate-950 text-slate-500 py-8 px-4 text-center text-sm mt-12">
        <Link href="/" className="font-black text-base mb-2 block">
          <span className="text-red-500">Safe</span>
          <span className="text-white">Bite</span>
        </Link>
        © 2025 SafeBite Project — すべての人が安全に働ける社会のために
      </footer>
    </div>
  );
}
