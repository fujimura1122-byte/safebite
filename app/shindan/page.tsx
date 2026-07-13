import type { Metadata } from "next";
import Link from "next/link";
import ShindanQuiz from "./ShindanQuiz";

const BASE_URL = "https://saferbite.org";
const PAGE_URL = `${BASE_URL}/shindan`;

export const metadata: Metadata = {
  title: "闇バイト危険度セルフ診断｜5つの質問で今すぐチェック｜SafeBite",
  description:
    "そのバイト、本当に大丈夫？5つの質問に答えるだけで闇バイトの危険度を無料診断。コピペ不要・匿名。荷物受け取り・高額日払いなど危険なサインを今すぐセルフチェック。",
  keywords:
    "闇バイト 診断,闇バイト 危険度 チェック,闇バイト 見分け方 診断,怪しいバイト 診断,闇バイト セルフチェック",
  alternates: { canonical: "/shindan" },
  openGraph: {
    title: "闇バイト危険度セルフ診断｜5つの質問で今すぐチェック",
    description:
      "そのバイト、本当に大丈夫？5つの質問に答えるだけで闇バイトの危険度を無料診断。コピペ不要・匿名。",
    url: PAGE_URL,
    siteName: "SafeBite",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "闇バイト危険度セルフ診断｜5つの質問で今すぐチェック｜SafeBite",
    description: "5つの質問に答えるだけで闇バイトの危険度を無料診断。コピペ不要・匿名。",
    images: ["/opengraph-image"],
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "闇バイト危険度セルフ診断",
  url: PAGE_URL,
  applicationCategory: "SecurityApplication",
  operatingSystem: "All",
  description:
    "5つの質問に答えるだけで、そのアルバイト・副業が闇バイトかどうかの危険度を無料で診断するセルフチェックツール。",
  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
  provider: { "@type": "Organization", name: "SafeBite", url: BASE_URL },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "SafeBite", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "闇バイト危険度セルフ診断", item: PAGE_URL },
  ],
};

export default function ShindanPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {[appSchema, breadcrumbSchema].map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <header className="bg-slate-950 border-b border-white/10 py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-black text-lg">
            <span className="text-red-500">Safe</span>
            <span className="text-white">Bite</span>
          </Link>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← トップページへ
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-slate-300 transition-colors">SafeBite</Link>
          <span>/</span>
          <span className="font-bold text-slate-300">危険度セルフ診断</span>
        </nav>

        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-400 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          無料・匿名・コピペ不要
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-3">
          闇バイト危険度<br />セルフ診断
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          そのアルバイト・副業、本当に大丈夫？<br />
          <strong className="text-white">5つの質問に「はい / いいえ」で答えるだけ。</strong>
          怪しい求人文を持っていなくても、今すぐ危険度をチェックできます。
        </p>

        <ShindanQuiz />

        {/* 補足 */}
        <p className="text-xs text-slate-600 leading-relaxed mt-8">
          ※ この診断は一般的な闇バイトの特徴に基づく簡易チェックです。実際の求人文・DMがある場合は
          <Link href="/#checker" className="text-slate-400 underline hover:text-slate-200"> AI危険度チェッカー</Link>
          で詳しく判定できます。緊急の場合は警察安全相談電話（#9110）へ。
        </p>
      </main>

      <footer className="bg-slate-950 border-t border-white/10 text-slate-500 py-8 px-4 text-center text-sm mt-8">
        <Link href="/" className="font-black text-base mb-2 block">
          <span className="text-red-500">Safe</span>
          <span className="text-white">Bite</span>
        </Link>
        © 2026 SafeBite Project — すべての人が安全に働ける社会のために
      </footer>
    </div>
  );
}
