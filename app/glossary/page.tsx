import type { Metadata } from "next";
import Link from "next/link";
import { terms } from "./terms";
import { GlossaryList } from "./_components/GlossaryList";

const BASE_URL = "https://saferbite.org";

// ── Schema.org: ItemList ──────────────────────────────────────────────────────
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "闇バイト隠語辞典 — 100語完全解説",
  description:
    "「UD」「ホワ案」「受け子」「叩き」など闇バイト・特殊詐欺で使われる隠語100語の意味・危険性・罰則を解説します。",
  url: `${BASE_URL}/glossary`,
  numberOfItems: terms.length,
  itemListElement: terms.map((term, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: term.word,
    url: `${BASE_URL}/glossary/${term.slug}`,
    description: term.short,
  })),
};

export const metadata: Metadata = {
  title: "闇バイト隠語辞典｜100語完全解説・UD・受け子・叩きの意味｜SafeBite",
  description:
    "「UD」「ホワ案」「受け子」「叩き」「ガチ案件」など、闇バイト・特殊詐欺で使われる隠語100語の意味と危険性を徹底解説。怪しいバイトの見分け方・相談先もまとめています。",
  keywords:
    "UD 意味,ホワ案 意味,受け子 バイト,出し子 意味,叩き 闇バイト,闇バイト 見分け方,闇バイト 断り方,架け子 意味,ガチ案件,即日払い 危険,審査なし バイト 危険",
};

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
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
        <div className="text-center mb-10">
          <div className="inline-block bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
            SEO・啓発コンテンツ
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight mb-4">
            闇バイト隠語辞典
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-6">
            SNSで飛び交う<strong className="text-slate-800">闇バイトの隠語・手口</strong>を{terms.length}語解説。<br />
            応募する前に必ず確認してください。
          </p>
          <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-5 text-sm text-red-700 leading-relaxed text-left">
            <strong className="block mb-2">⚠️ これらの言葉を使った求人には絶対に応募しないでください</strong>
            隠語でカモフラージュされた「バイト」の実態は犯罪です。知らずに関与した場合でも逮捕・起訴される事例が多数報告されています。
          </div>
        </div>

        {/* カテゴリタブ＋一覧（クライアントコンポーネント） */}
        <GlossaryList />

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
        © 2026 SafeBite Project — すべての人が安全に働ける社会のために
      </footer>
    </div>
  );
}
