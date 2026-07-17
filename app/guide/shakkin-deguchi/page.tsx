import type { Metadata } from "next";
import Link from "next/link";
import DebtConsolidationCTA from "@/app/_components/DebtConsolidationCTA";
import Sources, { GOV_SOURCES } from "@/app/_components/Sources";

const BASE_URL = "https://saferbite.org";
const PAGE_URL = `${BASE_URL}/guide/shakkin-deguchi`;

export const metadata: Metadata = {
  title: "借金で闇バイトに手を出す前に｜合法の出口「債務整理」とは｜SafeBite",
  description:
    "借金が返せず闇バイトを考えてしまう前に。法テラス・債務整理・公的貸付など、借金を合法的に解決する4つの出口を解説。犯罪に手を出す必要はありません。",
  keywords:
    "借金 返せない どうする,借金 相談 どこ,債務整理 とは,闇バイト 借金,借金 闇バイト やる前に,借金 合法 解決",
  alternates: { canonical: "/guide/shakkin-deguchi" },
  openGraph: {
    title: "借金で闇バイトに手を出す前に｜合法の出口「債務整理」とは",
    description:
      "借金が返せず闇バイトを考えてしまう前に。法テラス・債務整理・公的貸付など合法の出口を解説。",
    url: PAGE_URL,
    siteName: "SafeBite",
    locale: "ja_JP",
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "借金で闇バイトに手を出す前に｜合法の出口「債務整理」とは｜SafeBite",
    description: "借金が返せず闇バイトを考えてしまう前に。合法の出口を解説。",
    images: ["/opengraph-image"],
  },
};

// ── Schema.org JSON-LD ────────────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "借金で闇バイトに手を出す前に｜合法の出口「債務整理」とは",
  description:
    "借金が返せず闇バイトを考えてしまう前に。法テラス・債務整理・公的貸付など、借金を合法的に解決する4つの出口を解説します。",
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
      name: "借金が返せないとき、まずどこに相談すればいいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "国が設立した公的機関「法テラス（日本司法支援センター）0570-078374」がまず最初の窓口です。収入が少ない方は無料で弁護士・司法書士に相談でき、借金の解決方法（債務整理）を案内してもらえます。闇バイトや違法な借入に手を出す前に、必ず一度相談してください。",
      },
    },
    {
      "@type": "Question",
      name: "債務整理とは何ですか？借金は減らせますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "債務整理とは、法律に基づいて借金の負担を合法的に軽減・免除する手続きの総称です。任意整理（利息カット）・個人再生（大幅減額）・自己破産（原則免除）などがあり、状況に応じて選べます。弁護士・司法書士に依頼すると、貸金業者からの取り立ても止まります。",
      },
    },
    {
      "@type": "Question",
      name: "借金を理由に「闇バイトをやれ」と言われています。どうすれば？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "それは「借金漬け」と呼ばれる犯罪組織の手口で、あなたは被害者です。借金を返すために犯罪をする必要は一切ありません。警察安全相談電話（#9110）または法テラスに相談してください。相談しただけで逮捕されることはなく、むしろ保護の対象になります。",
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
    { "@type": "ListItem", position: 3, name: "借金の出口・債務整理", item: PAGE_URL },
  ],
};

// ── 合法の出口 ────────────────────────────────────────────────────────────────
const EXITS = [
  {
    icon: "⚖️",
    title: "法テラス（まず最初にここ）",
    tag: "公的・無料相談",
    desc: "国が設立した公的機関。収入が少ない方は無料で弁護士・司法書士に相談でき、費用の立替制度もあります。",
    action: "0570-078374（平日9〜21時／土9〜17時）",
  },
  {
    icon: "📉",
    title: "債務整理",
    tag: "借金を合法的に減らす",
    desc: "任意整理・個人再生・自己破産など、法律に基づいて借金を減額・免除する手続き。依頼した時点で取り立ても止まります。",
    action: "法テラスまたは弁護士・司法書士に相談",
  },
  {
    icon: "🏛️",
    title: "生活福祉資金貸付（公的貸付）",
    tag: "低利・無利子の公的融資",
    desc: "各都道府県の社会福祉協議会が行う低利・無利子の貸付制度。緊急小口資金など、生活の立て直しに使えます。",
    action: "お住まいの市区町村の社会福祉協議会",
  },
  {
    icon: "🆘",
    title: "生活保護・生活困窮者自立支援",
    tag: "最後のセーフティネット",
    desc: "生活が立ち行かない場合の公的支援。就労支援や家賃補助（住居確保給付金）などもあります。恥ずかしいことではありません。",
    action: "お住まいの市区町村の福祉窓口",
  },
];

const SEIRI_TYPES = [
  {
    name: "任意整理",
    what: "貸金業者と交渉し、将来の利息をカット。元本を分割返済する。",
    who: "安定した収入があり、利息さえ止まれば返せる人",
  },
  {
    name: "個人再生",
    what: "裁判所を通じて借金を大幅に減額（最大1/5程度）し、原則3年で返済。",
    who: "住宅を残したい人・借金が大きい人",
  },
  {
    name: "自己破産",
    what: "裁判所を通じて借金を原則全額免除。生活に必要な財産は残せる。",
    who: "返済のめどが立たない人",
  },
];

export default function ShakkinDeguchiPage() {
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
          <span className="font-bold text-slate-700">借金の出口・債務整理</span>
        </nav>

        {/* 警告バナー */}
        <div className="mb-8 bg-slate-950 rounded-2xl p-6 border-l-4 border-red-500">
          <p className="text-red-400 text-xs font-black uppercase tracking-widest mb-2">その借金、犯罪で返す必要はありません</p>
          <p className="text-white text-sm leading-relaxed font-bold">
            借金を返すために闇バイトを考えているなら、<br />
            <span className="text-red-400 text-lg">今すぐこのページを読んでください。</span>
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-2">
          借金で闇バイトに<br />手を出す前に
        </h1>
        <p className="text-xs text-slate-400 mb-4">最終更新：2026年7月</p>

        {/* 一言で言うと（AEO） */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">一言で言うと</div>
          <p className="text-base font-bold text-slate-800 leading-snug">
            借金は「債務整理」で合法的に減らせる。犯罪に手を出せば借金も罪も残る。まず法テラス（0570-078374）に無料相談を。
          </p>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-10">
          「高収入」「即日払い」の闇バイトに応募する人の多くが、
          <strong className="text-slate-800">借金や生活費の行き詰まり</strong>を抱えています。
          しかし闇バイトに手を出しても、借金は消えるどころか
          <strong className="text-slate-800">前科・被害弁償・新たな借金</strong>が上乗せされるだけです。
          借金には必ず<strong className="text-slate-800">合法の出口</strong>があります。
        </p>

        {/* 借金漬けの手口 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-4">「借金を返すために働け」は犯罪組織の罠</h2>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mb-4">
            <p className="text-sm text-slate-700 leading-relaxed">
              犯罪組織は「道具代」「交通費」などの名目で架空の借金を背負わせ、
              <strong className="text-red-700">「借金を返すまで闇バイトを続けろ」</strong>と強制します。
              これは<Link href="/glossary/shakin" className="underline decoration-dotted text-red-700 hover:text-red-800">「借金漬け」</Link>と呼ばれる手口で、
              あなたは<strong className="text-slate-900">加害者ではなく被害者</strong>です。
            </p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            一度入ると返済額は増え続け、抜け出せなくなります。この状況にいる場合は、
            借金の相談より先に<strong className="text-slate-800">警察安全相談電話（#9110）</strong>へ。
            相談しただけで逮捕されることはなく、保護の対象になります。
          </p>
        </section>

        {/* 合法の出口4つ */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-2">借金の「合法の出口」4つ</h2>
          <p className="text-sm text-slate-500 mb-5">どんな状況でも、必ずどれかが使えます。</p>
          <div className="flex flex-col gap-4">
            {EXITS.map((e) => (
              <div key={e.title} className="border border-slate-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-2xl flex-shrink-0">{e.icon}</span>
                  <span className="text-base font-black text-slate-900">{e.title}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                    {e.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-2">{e.desc}</p>
                <p className="text-xs font-bold text-slate-500 bg-slate-50 rounded-lg px-3 py-2">
                  📍 {e.action}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 債務整理の種類 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-2">債務整理の3つの方法</h2>
          <p className="text-sm text-slate-500 mb-5">どれが向いているかは、法テラス・弁護士が無料で診断してくれます。</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-300">
                  <th className="text-left px-4 py-2.5 font-black rounded-tl-xl">方法</th>
                  <th className="text-left px-4 py-2.5 font-black">内容</th>
                  <th className="text-left px-4 py-2.5 font-black rounded-tr-xl">向いている人</th>
                </tr>
              </thead>
              <tbody>
                {SEIRI_TYPES.map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-4 py-3 font-black text-slate-800 border-b border-slate-100 whitespace-nowrap">{row.name}</td>
                    <td className="px-4 py-3 text-slate-600 border-b border-slate-100 leading-relaxed">{row.what}</td>
                    <td className="px-4 py-3 text-slate-600 border-b border-slate-100 leading-relaxed">{row.who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            ※ 具体的な手続き・費用は状況により異なります。まず法テラスで無料相談を。
          </p>

          {/* 民間の無料減額診断（PR） */}
          <div className="mt-4">
            <DebtConsolidationCTA position="shakkin_deguchi_seiri" />
          </div>
        </section>

        {/* よくある誤解 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-4">よくある誤解</h2>
          <div className="flex flex-col gap-3">
            {[
              {
                myth: "「債務整理すると人生が終わる」",
                truth: "終わりません。一定期間ローンやクレジットカードが作りにくくなりますが、数年で回復します。前科がつく犯罪とは比較になりません。",
              },
              {
                myth: "「闇バイトで一気に返した方が早い」",
                truth: "闇バイトは借金に加えて前科・被害弁償（数百万円）・組織からの脅迫が残ります。人生を失う最も遅い道です。",
              },
              {
                myth: "「相談するお金もない」",
                truth: "法テラスは収入が少ない人ほど無料・立替で使えます。お金がないことこそ、法テラスを使う理由です。",
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

        {/* 相談窓口 */}
        <div className="bg-indigo-600 rounded-2xl p-6 text-white text-center mb-8">
          <p className="text-sm font-bold mb-1">借金の相談は、国の公的機関へ（無料）</p>
          <p className="text-3xl font-black mb-1 tracking-widest">0570-078374</p>
          <p className="text-xs opacity-80 mb-3">法テラス（日本司法支援センター）平日9〜21時／土9〜17時</p>
          <p className="text-xs opacity-90 leading-relaxed">
            収入が少ない方は無料で弁護士に相談できます。<br />
            闇バイトに手を出す前に、必ず一度ここへ。
          </p>
        </div>

        {/* 関連ガイド */}
        <div className="border border-slate-100 rounded-2xl p-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">関連ガイド</div>
          <div className="flex flex-col gap-3">
            {[
              {
                href: "/guide/kotowarikata",
                title: "闇バイトの断り方・辞め方",
                desc: "脅されても安全に抜け出す方法を段階別に解説",
              },
              {
                href: "/guide/taiho-jirei",
                title: "闇バイト逮捕・判決事例まとめ",
                desc: "「借金のためだった」でも実刑になる現実",
              },
              {
                href: "/glossary/shakin",
                title: "「借金漬け」とは？",
                desc: "犯罪組織が借金を口実に犯罪を強制する手口",
              },
            ].map(({ href, title, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <span className="text-indigo-400 font-black text-xs mt-1 flex-shrink-0 group-hover:text-indigo-600">▶</span>
                <div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Sources
          items={[GOV_SOURCES.houterasu, GOV_SOURCES.cfa, GOV_SOURCES.npaTokushu]}
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
