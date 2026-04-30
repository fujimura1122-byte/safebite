import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { terms, dangerConfig } from "../terms";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return terms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = terms.find((t) => t.slug === slug);
  if (!term) return {};
  return {
    title: term.word + "とは？意味・危険性・罰則を解説 | SafeBite 闇バイト隠語辞典",
    description:
      "「" + term.word + "」（" + term.read + "）の意味：" + term.short + "。" + term.detail.slice(0, 80) + "…。闇バイト隠語辞典 by SafeBite。",
    keywords:
      term.word + " 意味," + term.word + " 危険," + term.word + " 闇バイト,闇バイト 隠語",
  };
}

export default async function TermPage({ params }: Props) {
  const { slug } = await params;
  const term = terms.find((t) => t.slug === slug);
  if (!term) notFound();

  const d = dangerConfig[term.danger];
  const currentIndex = terms.findIndex((t) => t.slug === slug);
  const prev = terms[currentIndex - 1];
  const next = terms[currentIndex + 1];

  return (
    <div className="min-h-screen bg-white">
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

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* パンくず */}
        <nav className="text-xs text-slate-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-slate-700 transition-colors">SafeBite</Link>
          <span>/</span>
          <Link href="/glossary" className="hover:text-slate-700 transition-colors">闇バイト隠語辞典</Link>
          <span>/</span>
          <span className="text-slate-700 font-bold">{term.word}</span>
        </nav>

        {/* メイン */}
        <article>
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{term.word}</h1>
            <span className={"text-sm font-bold px-3 py-1 rounded-full border " + d.cls}>{d.label}</span>
          </div>
          <p className="text-slate-400 text-sm mb-8">読み：{term.read}</p>

          <div className="flex flex-col gap-6">
            {/* 一言説明 */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">ひとことで言うと</div>
              <p className="text-xl font-bold text-slate-800 leading-snug">{term.short}</p>
            </div>

            {/* 詳細 */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">詳細解説</div>
              <p className="text-slate-600 text-sm leading-loose">{term.detail}</p>
            </div>

            {/* 勧誘文例 */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
              <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3">⚠️ このような勧誘文に注意</div>
              <p className="text-slate-700 text-sm italic leading-relaxed">{term.example}</p>
            </div>

            {/* 罰則 */}
            <div className="bg-slate-950 rounded-2xl p-5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">罰則・刑罰</div>
              <p className="text-red-400 font-black text-lg">{term.punishment}</p>
            </div>
          </div>
        </article>

        {/* 前後ナビ */}
        <div className="flex gap-3 mt-12">
          {prev && (
            <Link
              href={"/glossary/" + prev.slug}
              className="flex-1 border border-slate-100 hover:border-slate-200 rounded-xl p-4 text-left transition-all group"
            >
              <div className="text-xs text-slate-400 mb-1">← 前の用語</div>
              <div className="text-sm font-bold text-slate-700 group-hover:text-red-600 transition-colors">{prev.word}</div>
            </Link>
          )}
          {next && (
            <Link
              href={"/glossary/" + next.slug}
              className="flex-1 border border-slate-100 hover:border-slate-200 rounded-xl p-4 text-right transition-all group"
            >
              <div className="text-xs text-slate-400 mb-1">次の用語 →</div>
              <div className="text-sm font-bold text-slate-700 group-hover:text-red-600 transition-colors">{next.word}</div>
            </Link>
          )}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-slate-950 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-black text-white mb-3">
            「{term.word}」が使われた求人を見つけたら
          </h3>
          <p className="text-slate-400 text-sm mb-5">SafeBiteのAIが即座に危険度を判定します</p>
          <Link
            href="/#checker"
            className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
          >
            無料で危険度チェックする →
          </Link>
        </div>

        {/* 他の隠語 */}
        <div className="mt-8 border border-slate-100 rounded-2xl p-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">他の隠語を調べる</div>
          <div className="flex flex-wrap gap-2">
            {terms.filter((t) => t.slug !== slug).map((t) => (
              <Link
                key={t.slug}
                href={"/glossary/" + t.slug}
                className="text-xs font-bold bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-600 hover:text-red-600 px-3 py-1.5 rounded-lg transition-all"
              >
                {t.word}
              </Link>
            ))}
          </div>
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
