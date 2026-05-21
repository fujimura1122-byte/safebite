import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { terms, dangerConfig, categoryConfig, type Term } from "../terms";

type Props = { params: Promise<{ slug: string }> };

// 危険度の優先順（ソート用）
const DANGER_ORDER = { extreme: 0, high: 1, caution: 2 } as const;

// ── Schema.org JSON-LD ────────────────────────────────────────────────────────
function buildJsonLd(term: Term) {
  const pageUrl = `https://saferbite.org/glossary/${term.slug}`;
  const ctaUrl  = "https://saferbite.org/#checker";

  // FAQPage: Google リッチリザルト（アコーディオン表示）を狙う
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `「${term.word}」とは何ですか？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${term.short}。${term.detail}`,
        },
      },
      {
        "@type": "Question",
        name: `「${term.word}」に関与・応募した場合の罰則は？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: term.punishment,
        },
      },
      {
        "@type": "Question",
        name: `「${term.word}」を使った怪しい求人を見つけたらどうすればよいですか？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `絶対に応募しないでください。SafeBite の AI チェッカー（${ctaUrl}）に求人文を貼り付けると危険度を即座に判定できます。不安な場合は警察安全相談電話（#9110）にご相談ください。`,
        },
      },
    ],
  };

  // Article: 検索結果にサイト名・日付を表示させる
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: term.seoTitle,
    description: term.seoDescription,
    url: pageUrl,
    dateModified: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Organization",
      name: "SafeBite",
      url: "https://saferbite.org",
    },
    publisher: {
      "@type": "Organization",
      name: "SafeBite",
      url: "https://saferbite.org",
      logo: { "@type": "ImageObject", url: "https://saferbite.org/opengraph-image" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };

  return [faqPage, article];
}

// カテゴリごとの「勧誘文例」セクション見出し
const EXAMPLE_LABEL: Record<1 | 2 | 3, string> = {
  1: "💬 こんな求人・状況に注意",
  2: "⚠️ このような勧誘文に注意",
  3: "⚠️ 実際に使われる場面・手口",
};

export async function generateStaticParams() {
  return terms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = terms.find((t) => t.slug === slug);
  if (!term) return {};

  // Cat.1（情報系）はキーワードを検索意図に合わせて最適化
  const keywords =
    term.category === 1
      ? `${term.word},闇バイト 見分け方,闇バイト 危険,闇バイト 対処法,闇バイト 断り方`
      : `${term.word} 意味,${term.word} 危険,${term.word} 闇バイト,闇バイト 隠語`;

  const pageUrl = "https://saferbite.org/glossary/" + term.slug;
  return {
    title: term.seoTitle,
    description: term.seoDescription,
    keywords,
    alternates: { canonical: "/glossary/" + term.slug },
    openGraph: {
      title: term.seoTitle,
      description: term.seoDescription,
      url: pageUrl,
      siteName: "SafeBite",
      locale: "ja_JP",
      type: "article",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: term.seoTitle,
      description: term.seoDescription,
      images: ["/opengraph-image"],
    },
  };
}

export default async function TermPage({ params }: Props) {
  const { slug } = await params;
  const term = terms.find((t) => t.slug === slug);
  if (!term) notFound();

  const d = dangerConfig[term.danger];
  const c = categoryConfig[term.category];

  // ── 同カテゴリ内の前後ナビ（危険度ソート済み）──
  const sameCat = [...terms]
    .filter((t) => t.category === term.category)
    .sort((a, b) => {
      const dd = DANGER_ORDER[a.danger] - DANGER_ORDER[b.danger];
      return dd !== 0 ? dd : a.slug.localeCompare(b.slug);
    });
  const catIdx = sameCat.findIndex((t) => t.slug === slug);
  const prev = sameCat[catIdx - 1];
  const next = sameCat[catIdx + 1];

  // ── 関連用語（同カテゴリmax10 + 他カテゴリのextreme max5）──
  const sameCatRelated = terms
    .filter((t) => t.slug !== slug && t.category === term.category)
    .sort((a, b) => DANGER_ORDER[a.danger] - DANGER_ORDER[b.danger])
    .slice(0, 10);

  const otherCatRelated = terms
    .filter((t) => t.slug !== slug && t.category !== term.category && t.danger === "extreme")
    .slice(0, 5);

  const relatedTerms = [...sameCatRelated, ...otherCatRelated];

  // Xシェアテキスト
  const shareText = encodeURIComponent(
    `「${term.word}」は${term.short}。闇バイト隠語辞典で実態を確認 → https://saferbite.org/glossary/${term.slug} #SafeBite #闇バイト`
  );

  // Cat.1の高意図ページ（応募後・相談窓口）は緊急CTAを上部に表示
  const isUrgent = ["yamibaitoouboshita", "yamibaitosoudan"].includes(slug);

  const jsonLd = buildJsonLd(term);

  return (
    <div className="min-h-screen bg-white">
      {/* Schema.org JSON-LD */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <header className="bg-slate-950 text-white py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-black text-lg">
            <span className="text-red-500">Safe</span>
            <span className="text-white">Bite</span>
          </Link>
          <Link href="/glossary" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← 隠語辞典一覧へ
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* パンくず */}
        <nav className="text-xs text-slate-400 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-slate-700 transition-colors">SafeBite</Link>
          <span>/</span>
          <Link href="/glossary" className="hover:text-slate-700 transition-colors">闇バイト隠語辞典</Link>
          <span>/</span>
          <span className={`font-bold px-2 py-0.5 rounded-full border ${c.color} ${c.bg} ${c.border}`}>
            {c.label}
          </span>
          <span>/</span>
          <span className="text-slate-700 font-bold">{term.word}</span>
        </nav>

        {/* 緊急CTA（応募してしまった・相談窓口ページのみ上部にも表示）*/}
        {isUrgent && (
          <div className="mb-8 bg-red-600 rounded-2xl p-6 text-white text-center">
            <p className="text-sm font-bold mb-1">今すぐ相談できます（匿名・無料）</p>
            <p className="text-2xl font-black mb-3">#9110</p>
            <p className="text-xs opacity-80 mb-4">警察安全相談電話（24時間対応）</p>
            <Link
              href="/#checker"
              className="inline-block bg-white text-red-600 font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:bg-red-50"
            >
              AIで求人の危険度をチェック →
            </Link>
          </div>
        )}

        {/* メイン記事 */}
        <article>
          {/* タイトル行 */}
          <div className="flex items-start gap-3 flex-wrap mb-1">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {term.word}
            </h1>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${d.cls}`}>
                {d.label}
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${c.color} ${c.bg} ${c.border}`}>
                {c.label}
              </span>
            </div>
          </div>
          <p className="text-slate-400 text-xs mb-8">読み：{term.read}</p>

          <div className="flex flex-col gap-6">
            {/* ひとことで言うと */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">ひとことで言うと</div>
              <p className="text-xl font-bold text-slate-800 leading-snug">{term.short}</p>
            </div>

            {/* 詳細解説 */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">詳細解説</div>
              <p className="text-slate-600 text-sm leading-loose">{term.detail}</p>
            </div>

            {/* 勧誘文例 / 場面 （カテゴリで見出しを変える）*/}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
              <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3">
                {EXAMPLE_LABEL[term.category]}
              </div>
              <p className="text-slate-700 text-sm italic leading-relaxed">{term.example}</p>
            </div>

            {/* 罰則 */}
            <div className="bg-slate-950 rounded-2xl p-5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">罰則・刑罰</div>
              <p className="text-red-400 font-black text-lg leading-snug">{term.punishment}</p>
            </div>
          </div>
        </article>

        {/* CTA */}
        <div className="mt-10 bg-slate-950 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-black text-white mb-2">
            「{term.word}」が使われた求人を見つけたら
          </h3>
          <p className="text-slate-400 text-sm mb-5">SafeBiteのAIが即座に危険度を判定します（無料・匿名）</p>
          <Link
            href="/#checker"
            className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
          >
            無料で危険度チェックする →
          </Link>
          {/* Xシェアボタン */}
          <div className="mt-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 border border-slate-700 hover:border-slate-500 rounded-lg px-4 py-2 transition-all"
            >
              <span className="font-black">𝕏</span>
              この隠語をシェアして広める
            </a>
          </div>
        </div>

        {/* 同カテゴリ内の前後ナビ */}
        <div className="flex gap-3 mt-8">
          {prev ? (
            <Link
              href={"/glossary/" + prev.slug}
              className="flex-1 border border-slate-100 hover:border-slate-200 rounded-xl p-4 text-left transition-all group"
            >
              <div className="text-xs text-slate-400 mb-1">← 同カテゴリの前の用語</div>
              <div className="text-sm font-bold text-slate-700 group-hover:text-red-600 transition-colors line-clamp-1">
                {prev.word}
              </div>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link
              href={"/glossary/" + next.slug}
              className="flex-1 border border-slate-100 hover:border-slate-200 rounded-xl p-4 text-right transition-all group"
            >
              <div className="text-xs text-slate-400 mb-1">同カテゴリの次の用語 →</div>
              <div className="text-sm font-bold text-slate-700 group-hover:text-red-600 transition-colors line-clamp-1">
                {next.word}
              </div>
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* 関連用語（同カテゴリmax10 + 他extreme max5）*/}
        <div className="mt-8 border border-slate-100 rounded-2xl p-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            関連する隠語を調べる
          </div>
          <p className="text-xs text-slate-400 mb-4">
            同じカテゴリ「{c.label}」の用語 ＋ 特に危険な隠語
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedTerms.map((t) => {
              const td = dangerConfig[t.danger];
              return (
                <Link
                  key={t.slug}
                  href={"/glossary/" + t.slug}
                  className="group flex items-center gap-1.5 text-xs font-bold bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-600 hover:text-red-600 px-3 py-1.5 rounded-lg transition-all"
                >
                  <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    t.danger === "extreme" ? "bg-red-500" :
                    t.danger === "high" ? "bg-amber-500" : "bg-yellow-400"
                  }`} />
                  {t.word}
                </Link>
              );
            })}
          </div>
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
