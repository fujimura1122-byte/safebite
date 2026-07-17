import type { Metadata } from "next";
import Link from "next/link";
import Sources, { GOV_SOURCES } from "@/app/_components/Sources";

const BASE_URL = "https://saferbite.org";
const PAGE_URL = `${BASE_URL}/glossary/usagi`;

export const metadata: Metadata = {
  title: "【即逮捕】うさぎとは？闇バイトで使われる隠語の意味と危険性｜SafeBite",
  description:
    "「うさぎ」は闇バイトで受け子・荷物の受け取り役を指す隠語です。SNSで募集されていますが、初犯でも懲役3年以上の実刑リスクがあります。意味・逮捕事例・断り方を解説。",
  keywords:
    "うさぎ 闇バイト,うさぎ 意味 闇バイト,うさぎ 隠語,ウサギ案件,受け子 隠語,闇バイト 隠語 うさぎ",
  alternates: { canonical: "/glossary/usagi" },
  openGraph: {
    title: "【即逮捕】うさぎとは？闇バイトで使われる隠語の意味と危険性",
    description:
      "「うさぎ」は受け子・荷物受け取り役の隠語。初犯でも懲役3年以上の実刑リスク。意味・逮捕事例・断り方を解説。",
    url: PAGE_URL,
    siteName: "SafeBite",
    locale: "ja_JP",
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "【即逮捕】うさぎとは？闇バイトで使われる隠語の意味と危険性｜SafeBite",
    description: "「うさぎ」は受け子の隠語。初犯でも懲役3年以上。意味・逮捕事例・断り方を解説。",
    images: ["/opengraph-image"],
  },
};

// ── Schema.org JSON-LD ────────────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "【即逮捕】うさぎとは？闇バイトで使われる隠語の意味と危険性",
  description:
    "「うさぎ」は闇バイトで受け子・荷物の受け取り役を指す隠語です。SNSで募集されていますが、初犯でも懲役3年以上の実刑リスクがあります。",
  url: PAGE_URL,
  dateModified: "2026-07-13T00:00:00+09:00",
  image: {
    "@type": "ImageObject",
    url: `${BASE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
  },
  author: { "@type": "Organization", name: "SafeBite", url: BASE_URL },
  publisher: {
    "@type": "Organization",
    name: "SafeBite",
    url: BASE_URL,
    logo: { "@type": "ImageObject", url: `${BASE_URL}/opengraph-image` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "「うさぎ」とは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "「うさぎ」は闇バイトで受け子（荷物・現金の受け取り役）を指す隠語です。SNSやTelegramで「うさぎさん募集」「ウサギ案件」などの形で求人されます。実態は特殊詐欺グループの末端実行役で、逮捕率が極めて高い役割です。",
      },
    },
    {
      "@type": "Question",
      name: "「うさぎ」に応募したら逮捕されますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、逮捕される可能性が非常に高いです。受け子は被害者の自宅に直接出向くため、防犯カメラ・指紋・目撃証言などの物証が残りやすく、逮捕率は高水準です。「バイトだと思っていた」は無罪の理由にならず、初犯でも懲役3年以上の実刑判決が出ています。",
      },
    },
    {
      "@type": "Question",
      name: "「うさぎ」の求人を断る方法は？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "「法律に詳しい人と相談しないといけないので」と伝えてすぐにブロック・削除してください。すでに個人情報を渡してしまった場合は、警察安全相談電話（#9110）または法テラス（0570-078374）に相談することをお勧めします。",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "SafeBite", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "闇バイト隠語辞典", item: `${BASE_URL}/glossary` },
    { "@type": "ListItem", position: 3, name: "うさぎ", item: PAGE_URL },
  ],
};

// ── チェックリスト ──────────────────────────────────────────────────────────
const CHECKLIST = [
  "「うさぎ」「ウサギ」「rabbit」などの隠語が使われている",
  "「荷物を受け取るだけ」「手渡しするだけ」という説明がある",
  "日払い・即日払いで高額（1万円以上/回）",
  "身分証・住所・写真の提出を求められる",
  "具体的な会社名・業務内容が説明されない",
  "Telegram・Signal・匿名DMでのやり取り",
  "「合法です」「詐欺じゃない」と強調している",
  "断ると「個人情報を知っている」と脅してくる",
];

// ── 断り方 ────────────────────────────────────────────────────────────────
const REFUSAL_STEPS = [
  {
    stage: "応募前",
    action: "無視・ブロック",
    script: "メッセージを読んでもブロックするだけでOK。返信は不要。",
  },
  {
    stage: "やり取り中",
    action: "即座に連絡を断つ",
    script: "「法律に詳しい人に確認が必要です」と送信後、ブロック・アカウント削除。",
  },
  {
    stage: "個人情報を渡した後",
    action: "警察・法テラスに相談",
    script: "「身分証の写真を送ってしまった」でも相談OK。警察は被害者として扱います。",
  },
  {
    stage: "仕事を受けてしまった後",
    action: "弁護士に相談してから自首",
    script: "すぐに法テラス（0570-078374）または弁護士に連絡。自首は量刑に有利に働きます。",
  },
];

export default function UsagiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Schema.org JSON-LD */}
      {[articleSchema, faqSchema, breadcrumbSchema].map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
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
          <span className="font-bold text-slate-700">うさぎ</span>
        </nav>

        {/* 危険度バッジ */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-red-100 text-red-700 border-red-200">
            即逮捕レベル
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-red-50 text-red-700 border-red-200">
            実行役・組織の隠語
          </span>
        </div>

        {/* H1 + 読み */}
        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-1">
          うさぎとは？
        </h1>
        <p className="text-slate-400 text-xs mb-8">読み：うさぎ ／ 最終更新：2026年7月</p>

        {/* 一言で言うと（AEO対策） */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">一言で言うと</div>
          <p className="text-xl font-bold text-slate-800 leading-snug">
            受け子・荷物受け取り役を指す闇バイトの隠語。関与すれば即逮捕レベルの危険。
          </p>
        </div>

        {/* 統計 */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { n: "懲役3〜10年", label: "受け子の典型的な判決" },
            { n: "初犯でも実刑", label: "「知らなかった」は無罪にならない" },
            { n: "逮捕率が高い", label: "現場に出向くため物証が残る" },
          ].map(({ n, label }) => (
            <div key={n} className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
              <div className="text-sm font-black text-red-600 leading-tight">{n}</div>
              <div className="text-xs text-slate-500 mt-1 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* H2: 語源・意味 */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4">うさぎの語源・意味</h2>
          <p className="text-slate-600 text-sm leading-loose mb-4">
            「うさぎ」は特殊詐欺グループで<strong className="text-slate-900">受け子（荷物・現金の受け取り役）</strong>を指す隠語です。
            「素早く動き回るウサギ」のイメージが語源とされており、被害者の自宅や指定場所へ素早く移動して荷物を受け取ることを指します。
          </p>
          <p className="text-slate-600 text-sm leading-loose mb-4">
            SNSでは「うさぎさん募集」「ウサギ案件」「うさぎ急募」などの形で求人されます。
            表向きは「荷物を受け取って渡すだけ」「簡単な配達業務」という説明ですが、
            実際は<strong className="text-slate-900">オレオレ詐欺・還付金詐欺などの被害者から現金や荷物を騙し取る役割</strong>です。
          </p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>「受け子」との関係：</strong>うさぎは受け子と同じ役割を指す隠語です。
              同様の隠語として「ウサちゃん」「うさ」「rabbit」なども使われることがあります。
            </p>
          </div>
        </section>

        {/* H2: 募集文例 */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4">SNSで使われる募集文例</h2>
          <p className="text-slate-500 text-xs mb-4">以下は実際に使われている典型的な勧誘文です。見かけたら即座にブロックしてください。</p>
          <div className="flex flex-col gap-3">
            {[
              "「うさぎさん急募。日払い3万円。身動きが取れる方。詳細はDMで。」",
              "「【ウサギ案件】荷物を受け取って渡すだけ。簡単作業。1件2〜5万円。即日払い可。」",
              "「うさぎできる方を探しています。高収入。週1〜OK。審査なし。」",
              "「rabbit 募集中。東京近郊の方優先。詳細は@XXXXへDM」",
              "「荷物うけとり→渡すだけ。特殊スキル不要。日当3万〜。うさぎやったことある人大歓迎。」",
            ].map((text) => (
              <div key={text} className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
                <span className="text-red-400 font-black text-xs mt-0.5 flex-shrink-0">⚠</span>
                <p className="text-slate-700 text-sm italic leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* H2: 罪と刑罰 */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4">うさぎに関与した場合の罪と刑罰</h2>
          <div className="bg-slate-950 rounded-2xl p-6 mb-5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">主な適用罪名と刑罰</div>
            <div className="flex flex-col gap-4">
              {[
                { law: "詐欺罪", max: "懲役10年以下", note: "特殊詐欺の受け取り役として最も多く適用される" },
                { law: "窃盗罪", max: "懲役10年以下", note: "ATMカードで現金を盗む行為などに適用" },
                { law: "組織的犯罪処罰法（加重）", max: "懲役15年以下", note: "組織的な詐欺と認定された場合に刑が加重される" },
              ].map(({ law, max, note }) => (
                <div key={law} className="border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-bold text-sm">{law}</span>
                    <span className="text-red-400 font-black text-sm">{max}</span>
                  </div>
                  <p className="text-slate-400 text-xs">{note}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {[
              {
                myth: "「バイトだと思っていた」「指示に従っただけ」",
                truth: "裁判所は高額報酬・身分証提出・指定場所への移動などから「犯罪と認識できた」と判断します。未必の故意が認定され有罪になります。",
              },
              {
                myth: "「1回だけ関与した」「少ししかやっていない」",
                truth: "1回でも詐欺罪は成立します。被害額・回数に関係なく懲役刑の対象です。",
              },
              {
                myth: "「受け取っただけで渡していない」",
                truth: "受け取った時点で詐欺の共犯行為は完成しています。渡す前に止めても既遂扱いになるケースがあります。",
              },
            ].map(({ myth, truth }) => (
              <div key={myth} className="border border-slate-100 rounded-xl overflow-hidden">
                <div className="bg-red-50 px-4 py-2.5 flex items-start gap-2">
                  <span className="text-red-400 font-black text-xs mt-0.5 flex-shrink-0">✗</span>
                  <p className="text-sm font-bold text-red-700">{myth}</p>
                </div>
                <div className="px-4 py-3 flex items-start gap-2">
                  <span className="text-emerald-500 font-black text-xs mt-0.5 flex-shrink-0">→</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{truth}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* H2: チェックリスト */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-2">うさぎ求人を見分けるチェックリスト</h2>
          <p className="text-sm text-slate-500 mb-4">1つでも当てはまれば闇バイトの可能性が極めて高いです。</p>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            {CHECKLIST.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-5 py-4 border-b border-slate-100 last:border-0"
              >
                <span className="w-5 h-5 rounded-full bg-red-100 border border-red-200 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-slate-950 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl flex-shrink-0">🔍</span>
            <div>
              <p className="text-white text-xs font-bold mb-0.5">求人文をAIでチェックする</p>
              <p className="text-slate-400 text-xs">SafeBiteのAIが無料・匿名で危険度を即座に判定します</p>
            </div>
            <Link
              href="/#checker"
              className="ml-auto bg-red-500 hover:bg-red-400 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all flex-shrink-0"
            >
              チェック →
            </Link>
          </div>
        </section>

        {/* H2: 断り方 */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4">誘われたときの断り方</h2>
          <div className="flex flex-col gap-4">
            {REFUSAL_STEPS.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-slate-950 text-white text-xs font-black flex items-center justify-center">
                    {i + 1}
                  </div>
                  {i < REFUSAL_STEPS.length - 1 && (
                    <div className="w-0.5 h-full bg-slate-200 mt-2" />
                  )}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{step.stage}</span>
                    <span className="text-sm font-black text-slate-900">{step.action}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.script}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-red-600 rounded-2xl p-5 text-white text-center">
            <p className="text-sm font-bold mb-1">今すぐ相談できます（匿名・無料）</p>
            <p className="text-3xl font-black mb-1 tracking-widest">#9110</p>
            <p className="text-xs opacity-80 mb-3">警察安全相談電話 — 24時間対応</p>
            <p className="text-xs opacity-90">
              弁護士への相談は<strong>法テラス 0570-078374</strong>（平日9〜21時）へ。
            </p>
          </div>
        </section>

        {/* H2: 関連隠語 */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-slate-900 mb-4">関連する闇バイト隠語</h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              {
                href: "/glossary/ukeko",
                word: "受け子",
                desc: "「うさぎ」と同義。荷物・現金を受け取る末端実行役。",
                danger: "即逮捕レベル",
              },
              {
                href: "/glossary/ud",
                word: "UD",
                desc: "Underground（裏の仕事）の略。うさぎ案件を含む違法業務全般を指す。",
                danger: "即逮捕レベル",
              },
              {
                href: "/glossary/dashiko",
                word: "出し子",
                desc: "ATMから不正に現金を引き出す役割。うさぎと並ぶ代表的な末端役割。",
                danger: "即逮捕レベル",
              },
              {
                href: "/glossary/hakobiya",
                word: "運び屋",
                desc: "現金・荷物・カードを指定場所へ運ぶ役割。うさぎと似た手口で勧誘される。",
                danger: "即逮捕レベル",
              },
            ].map(({ href, word, desc, danger }) => (
              <Link
                key={href}
                href={href}
                className="flex items-start gap-3 p-4 border border-slate-100 hover:border-red-200 hover:bg-red-50 rounded-xl transition-all group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-black text-slate-800 group-hover:text-red-600 transition-colors">{word}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">{danger}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
                <span className="text-red-400 font-black text-xs mt-1 flex-shrink-0 group-hover:text-red-600">▶</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 逮捕事例 → 内部リンク */}
        <div className="mb-8 border border-slate-100 rounded-2xl p-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">関連ガイド</div>
          <div className="flex flex-col gap-3">
            {[
              {
                href: "/guide/taiho-jirei",
                title: "闇バイト逮捕・判決事例まとめ",
                desc: "実際の逮捕事例と判決内容。「知らなかった」では済まない現実。",
              },
              {
                href: "/guide/kotowarikata",
                title: "闇バイトの断り方・辞め方",
                desc: "応募前〜仕事後まで段階別の断り方と脅された場合の対処法。",
              },
              {
                href: "/guide/higai-soudan",
                title: "闇バイト被害に遭ったらやること",
                desc: "緊急対処法・相談窓口・よくある不安への回答。",
              },
            ].map(({ href, title, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <span className="text-red-400 font-black text-xs mt-1 flex-shrink-0 group-hover:text-red-600">▶</span>
                <div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* メインCTA */}
        <div className="bg-slate-950 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-black text-white mb-2">
            「うさぎ」が使われた求人を見つけたら
          </h3>
          <p className="text-slate-400 text-sm mb-5">
            SafeBiteのAIが即座に危険度を判定します（無料・匿名）
          </p>
          <Link
            href="/#checker"
            className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
          >
            無料で危険度チェックする →
          </Link>
          <div className="mt-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("「うさぎ」は闇バイトで受け子を指す隠語。初犯でも懲役3年以上の実刑リスク → https://saferbite.org/glossary/usagi #SafeBite #闇バイト")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 border border-slate-700 hover:border-slate-500 rounded-lg px-4 py-2 transition-all"
            >
              <span className="font-black">𝕏</span>
              この隠語をシェアして広める
            </a>
          </div>
        </div>
        <Sources
          items={[GOV_SOURCES.npaTokushu, GOV_SOURCES.sos47, GOV_SOURCES.keihou]}
        />
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
