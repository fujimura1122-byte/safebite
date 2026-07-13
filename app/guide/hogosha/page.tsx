import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://saferbite.org";

export const metadata: Metadata = {
  title: "保護者・学校向け｜闇バイトから子どもを守るガイド｜SafeBite",
  description:
    "SNS・TikTokで広がる闇バイト募集から子どもを守るための知識と対策を保護者・教師向けに解説。見分け方・声かけ方法・相談窓口を網羅しています。",
  keywords:
    "闇バイト 保護者,闇バイト 親 対策,闇バイト 学校 対策,闇バイト 中学生 高校生,闇バイト 見分け方 子供,闇バイト 予防,SNS 闇バイト 勧誘",
  alternates: { canonical: "/guide/hogosha" },
  openGraph: {
    title: "保護者・学校向け｜闇バイトから子どもを守るガイド",
    description:
      "SNSで広がる闇バイト募集から子どもを守るための知識と対策。見分け方・声かけ・相談窓口を解説。",
    url: `${BASE_URL}/guide/hogosha`,
    siteName: "SafeBite",
    locale: "ja_JP",
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "保護者・学校向け｜闇バイトから子どもを守るガイド｜SafeBite",
    description: "SNSで広がる闇バイト募集から子どもを守るための知識と対策。",
    images: ["/opengraph-image"],
  },
};

// ── Schema.org JSON-LD ────────────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "保護者・学校向け｜闇バイトから子どもを守るガイド",
  description:
    "SNSで広がる闇バイト募集から子どもを守るための知識と対策を保護者・教師向けに解説。",
  url: `${BASE_URL}/guide/hogosha`,
  dateModified: "2026-05-21T00:00:00+09:00",
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
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/guide/hogosha` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "子どもが闇バイトに関わっているかもしれない。どうすればわかりますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "急に現金を持つようになった、深夜に外出する、スマホを見せなくなったなどのサインが現れることがあります。直接問い詰めるのではなく「最近バイト探してる？」と自然に話しかけ、安心して話せる関係づくりが先決です。",
      },
    },
    {
      "@type": "Question",
      name: "子どもが闇バイトに応募してしまった場合、親はどうすればいいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "まず子どもを責めないことが最重要です。責めると隠ぺいや逃亡につながります。一緒に法テラス（0570-078374）や警察安全相談（#9110）に相談し、弁護士のアドバイスを受けながら対処することをお勧めします。",
      },
    },
    {
      "@type": "Question",
      name: "学校でできる闇バイト防止教育はどういうものですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "「おいしいバイト」「即日払い」「審査なし」などの隠語を教えること、実際の逮捕事例を紹介すること、相談窓口（#9110）を周知することが効果的です。SafeBiteの隠語辞典（https://saferbite.org/glossary）は授業・学級通信での引用が自由です。",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "SafeBite", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "ガイド", item: `${BASE_URL}/guide` },
    {
      "@type": "ListItem",
      position: 3,
      name: "保護者・学校向けガイド",
      item: `${BASE_URL}/guide/hogosha`,
    },
  ],
};

// ── コンテンツデータ ──────────────────────────────────────────────────────────
const WARNING_SIGNS = [
  { icon: "💰", sign: "急に現金・高額品を持つようになった" },
  { icon: "🌙", sign: "深夜に外出することが増えた" },
  { icon: "📵", sign: "スマホを隠すようになった・見せなくなった" },
  { icon: "😶", sign: "表情が暗い・不安そうにしている" },
  { icon: "🏫", sign: "学校を休みがち・遅刻が増えた" },
  { icon: "💸", sign: "急に高価なものを欲しがる・「すぐお金が必要」と言う" },
  { icon: "🔇", sign: "友人関係が急に変わった・特定の人と頻繁に連絡している" },
  { icon: "📦", sign: "荷物の受け渡しをしている" },
];

const RECRUITMENT_PATTERNS = [
  {
    label: "高額・即日払い系",
    examples: ["日給3万円〜 即日払い", "単発OK 審査なし 高校生歓迎", "1時間5000円 楽な仕事"],
    risk: "「楽して稼げる」は詐欺・闇バイトのサイン。合法的な仕事でこの条件はありえません。",
  },
  {
    label: "隠語・暗号系",
    examples: ["UD 受け子 募集", "ホワ案あり 即日稼げる", "荷物受け取るだけ 楽"],
    risk: "「UD」「受け子」「ホワ案」は特殊詐欺の隠語。知らずに応募しても逮捕されます。",
  },
  {
    label: "個人情報収集系",
    examples: ["面接前に身分証を送ってください", "マイナンバー・免許証の写真を事前送付", "住所・銀行口座を教えて"],
    risk: "個人情報は犯罪に悪用されます。正当な採用で面接前に身分証を求めることはありません。",
  },
  {
    label: "SNS・DM直接勧誘系",
    examples: ["Instagramのフォロワーに突然DM", "「副業しない？」とLINEで連絡", "TikTokコメント欄で勧誘"],
    risk: "SNSでの突然の高額バイト勧誘はほぼ詐欺。公式の求人サイト経由以外は疑ってください。",
  },
];

const CONVERSATION_TIPS = [
  {
    situation: "日常的な関係づくり",
    tips: [
      "「バイトどんなものがあるか知ってる？」と気軽に話題にする",
      "自分の仕事・給与の話を正直にする（現実的な収入感覚を伝える）",
      "「おいしい話には裏がある」を具体例で説明しておく",
      "スマホの使い方をルール化ではなく話し合いで決める",
    ],
  },
  {
    situation: "子どもが関わっているかもしれない場合",
    tips: [
      "まず怒らない・責めない（隠ぺいや逃亡を防ぐため）",
      "「一緒に解決しよう」と伝える",
      "「絶対に助ける」と言葉にして伝える",
      "親だけで抱え込まず弁護士・警察に相談する",
    ],
  },
  {
    situation: "すでに関わってしまった場合",
    tips: [
      "「警察に行こう」ではなく「弁護士に相談しよう」から始める",
      "法テラス（0570-078374）に一緒に電話する",
      "証拠（スクリーンショット）を一緒に保存する",
      "仕事への連絡・参加を今すぐ止める",
    ],
  },
];

const SCHOOL_ACTIONS = [
  {
    title: "ホームルーム・道徳での啓発",
    content:
      "実際の逮捕事例（懲役3〜5年判決など）を紹介し、「知らなかった」は通用しないことを具体的に説明。SafeBite隠語辞典の内容を活用してください。",
  },
  {
    title: "進路指導での求人チェック教育",
    content:
      "「審査なし・即日払い・高額」の組み合わせは危険のサイン。Indeedなど信頼できる求人サイトの使い方を教える。",
  },
  {
    title: "保護者向け通信での周知",
    content:
      "SafeBiteのURLを学級通信に掲載する、#9110の番号を配布するなど。このサイトの引用は自由です。",
  },
  {
    title: "スクールカウンセラーへの連携",
    content:
      "「バイトのことで悩んでいる」という相談を受けた場合、一人で抱え込まずスクールカウンセラー・警察と連携する体制を整備する。",
  },
];

export default function HogoshaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD */}
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
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← トップページへ
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* パンくず */}
        <nav className="text-xs text-slate-400 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-slate-700 transition-colors">SafeBite</Link>
          <span>/</span>
          <span className="text-slate-700 font-bold">保護者・学校向けガイド</span>
        </nav>

        {/* ヘッダー */}
        <div className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
          保護者・教育者向け
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-3">
          闇バイトから子どもを<br />守るためのガイド
        </h1>

        {/* 一言で言うと（AEO・AI検索最適化） */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">一言で言うと</div>
          <p className="text-base font-bold text-slate-800 leading-snug">
            日頃から「高収入バイトは疑う」「断っていい」と伝えておく。危険なサインは突然の現金・夜間外出・SNSで知り合った人との急接触。
          </p>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-10">
          2024〜2025年、闇バイトによる10代の逮捕者数が急増しています。
          <strong className="text-slate-800">「知らなかった」では済まない</strong>犯罪に、
          子どもが巻き込まれないよう、知識と対策をまとめました。
        </p>

        {/* 危険な数字 */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          {[
            { n: "10代の3割", label: "闇バイト募集を見たことがある" },
            { n: "1,000人超", label: "2024〜2025年逮捕者数" },
            { n: "懲役5年超", label: "実行犯に下された判決例" },
          ].map(({ n, label }) => (
            <div key={n} className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
              <div className="text-lg font-black text-red-600">{n}</div>
              <div className="text-xs text-slate-500 mt-1 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* 危険なサイン */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-2">
            子どもに出るかもしれない危険なサイン
          </h2>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">
            以下のサインが複数重なっている場合は要注意。ただし決めつけず、まず話を聞くことが大切です。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {WARNING_SIGNS.map(({ icon, sign }) => (
              <div
                key={sign}
                className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3"
              >
                <span className="text-xl flex-shrink-0">{icon}</span>
                <span className="text-sm text-slate-700 font-medium">{sign}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 闇バイト募集パターン */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-2">
            SNSで使われる募集パターン
          </h2>
          <p className="text-sm text-slate-500 mb-5 leading-relaxed">
            実際にSNSやDMで使われている文例と、その危険性を解説します。
          </p>
          <div className="flex flex-col gap-4">
            {RECRUITMENT_PATTERNS.map(({ label, examples, risk }) => (
              <div key={label} className="border border-slate-100 rounded-2xl overflow-hidden">
                <div className="bg-slate-950 px-5 py-3">
                  <span className="text-xs font-black text-red-400 uppercase tracking-widest">{label}</span>
                </div>
                <div className="p-5">
                  <div className="bg-slate-50 rounded-xl p-4 mb-3">
                    {examples.map((ex) => (
                      <p key={ex} className="text-sm text-slate-600 italic mb-1 last:mb-0">
                        「{ex}」
                      </p>
                    ))}
                  </div>
                  <p className="text-xs text-red-600 font-bold leading-relaxed">
                    ⚠️ {risk}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 声かけ・対話 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-2">
            子どもへの声かけ・対話のポイント
          </h2>
          <div className="flex flex-col gap-4">
            {CONVERSATION_TIPS.map(({ situation, tips }) => (
              <div key={situation} className="border border-slate-100 rounded-2xl p-5">
                <h3 className="text-sm font-black text-slate-800 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  {situation}
                </h3>
                <ul className="flex flex-col gap-2">
                  {tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-blue-400 flex-shrink-0 mt-0.5">✓</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 学校でできること */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-2">
            学校・教師ができる対策
          </h2>
          <div className="flex flex-col gap-4">
            {SCHOOL_ACTIONS.map(({ title, content }) => (
              <div key={title} className="flex items-start gap-4 border border-slate-100 rounded-xl p-4">
                <span className="text-2xl flex-shrink-0">📚</span>
                <div>
                  <p className="text-sm font-black text-slate-800 mb-1">{title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 leading-relaxed">
            📌 SafeBiteの隠語辞典・ガイドコンテンツは<strong>学校・学級通信・授業での引用が自由</strong>です。
            出典として「SafeBite（https://saferbite.org）」を記載してください。
          </div>
        </section>

        {/* 相談窓口 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-4">相談窓口</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                name: "警察安全相談電話",
                number: "#9110",
                note: "24時間・匿名OK。子どもの代わりに保護者が相談することも可能。",
                color: "bg-red-600",
              },
              {
                name: "法テラス",
                number: "0570-078374",
                note: "弁護士への無料相談。収入が少なくても利用できます。",
                color: "bg-indigo-600",
              },
              {
                name: "よりそいホットライン",
                number: "0120-279-338",
                note: "24時間・無料。10代の悩みを専門に受け付けています。",
                color: "bg-teal-600",
              },
              {
                name: "子ども・若者相談（各自治体）",
                number: "市区町村窓口へ",
                note: "ひきこもり・生活困窮・犯罪被害等の総合窓口。",
                color: "bg-slate-600",
              },
            ].map((c) => (
              <div key={c.name} className={`${c.color} rounded-2xl p-5 text-white`}>
                <p className="text-xs font-bold opacity-80 mb-1">{c.name}</p>
                <p className="text-xl font-black tracking-widest mb-2">{c.number}</p>
                <p className="text-xs opacity-90 leading-relaxed">{c.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-slate-950 rounded-2xl p-8 text-center mb-8">
          <h3 className="text-lg font-black text-white mb-2">
            怪しい求人のテキストをAIで判定
          </h3>
          <p className="text-slate-400 text-sm mb-5">
            子どもが見せてくれた求人文を貼り付けるだけ。無料・匿名で判定できます。
          </p>
          <Link
            href="/#checker"
            className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
          >
            無料で危険度チェックする →
          </Link>
        </div>

        {/* 関連ガイド */}
        <div className="border border-slate-100 rounded-2xl p-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            関連ガイド
          </div>
          <div className="flex flex-col gap-3">
            {[
              {
                href: "/guide/higai-soudan",
                title: "闇バイト被害に遭ったらやること",
                desc: "緊急対処法・相談窓口・よくある不安への回答",
              },
              {
                href: "/guide/kotowarikata",
                title: "闇バイトの断り方・辞め方",
                desc: "応募前〜仕事後まで段階別の断り方と対処法",
              },
              {
                href: "/guide/taiho-jirei",
                title: "逮捕・判決事例まとめ",
                desc: "「知らなかった」では済まない実際の判決事例",
              },
              {
                href: "/glossary",
                title: "闇バイト隠語辞典 100語",
                desc: "UD・受け子・ホワ案など隠語の意味・危険性を解説",
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
