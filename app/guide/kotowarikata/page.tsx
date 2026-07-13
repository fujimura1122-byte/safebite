import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "闇バイトの断り方・辞め方｜脅されても安全に抜け出す方法【相談先付き】｜SafeBite",
  description:
    "「断ったら家族に連絡する」と脅されても必ず出口はあります。まだ応募していない段階から仕事を始めてしまった段階まで、状況別の具体的な断り方と相談窓口をSafeBiteが解説します。",
  keywords:
    "闇バイト 断り方,闇バイト 辞め方,闇バイト 抜け方,闇バイト 脅された,闇バイト 逃げ方,闇バイト 対処法",
  alternates: { canonical: "/guide/kotowarikata" },
  openGraph: {
    title: "闇バイトの断り方・辞め方｜脅されても安全に抜け出す方法",
    description: "「断ったら家族に連絡する」と脅されても必ず出口はあります。状況別の具体的な断り方と相談窓口を解説。",
    url: "https://saferbite.org/guide/kotowarikata",
    siteName: "SafeBite",
    locale: "ja_JP",
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "闇バイトの断り方・辞め方｜脅されても安全に抜け出す方法",
    description: "状況別の具体的な断り方・辞め方と相談窓口を解説します。",
    url: "https://saferbite.org/guide/kotowarikata",
    dateModified: "2026-05-21T00:00:00+09:00",
    image: {
      "@type": "ImageObject",
      url: "https://saferbite.org/opengraph-image",
      width: 1200,
      height: 630,
    },
    author: { "@type": "Organization", name: "SafeBite", url: "https://saferbite.org" },
    publisher: {
      "@type": "Organization", name: "SafeBite",
      url: "https://saferbite.org",
      logo: { "@type": "ImageObject", url: "https://saferbite.org/opengraph-image" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": "https://saferbite.org/guide/kotowarikata" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "闇バイトに応募してしまった後でも断れますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、断れます。個人情報を送る前なら連絡を完全に断ち切るだけでOK。送ってしまった後でも警察安全相談（#9110）や法テラスに相談すれば保護を受けられます。",
        },
      },
      {
        "@type": "Question",
        name: "「辞めたら家族に連絡する」と脅された場合はどうすればいいですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "脅迫罪・恐喝罪が成立する犯罪行為です。怖くても一人で抱え込まず、すぐに警察安全相談電話（#9110）または最寄りの警察署に相談してください。被害者として保護を受けられます。",
        },
      },
      {
        "@type": "Question",
        name: "一度仕事をしてしまった後でも自首できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "できます。実行前の相談が理想ですが、実行後でも早期の自首・捜査協力により刑事処分が軽減されるケースがあります。弁護士への無料相談（法テラス：0570-078374）を活用してください。",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "SafeBite", item: "https://saferbite.org" },
      { "@type": "ListItem", position: 2, name: "ガイド", item: "https://saferbite.org/guide/kotowarikata" },
      { "@type": "ListItem", position: 3, name: "闇バイトの断り方", item: "https://saferbite.org/guide/kotowarikata" },
    ],
  },
];

const STEPS = [
  {
    stage: "段階①",
    title: "まだ応募・連絡していない",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700",
    steps: [
      "求人を無視・削除する（返信は不要）",
      "URLをクリックした・フォームを開いただけなら問題なし",
      "SafeBiteのAIチェッカーで怪しさを確認してから判断する",
    ],
    note: null,
  },
  {
    stage: "段階②",
    title: "連絡した・面接の約束をした",
    color: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
    steps: [
      "「別の仕事が決まりました」と一言送り、即ブロックでOK",
      "理由を詳しく説明する必要はない",
      "相手が食い下がっても返信せず完全無視する",
    ],
    note: "まだ個人情報を渡していなければリスクは低い。今すぐ関係を断ち切ること。",
  },
  {
    stage: "段階③",
    title: "住所・顔写真・身分証を送ってしまった",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    steps: [
      "今すぐ連絡先をブロックし、やり取りのスクリーンショットを保存する",
      "警察安全相談（#9110）または最寄りの警察署に相談する",
      "「情報を拡散する」と脅された場合は即座に警察へ（脅迫罪が成立）",
    ],
    note: "個人情報を送った後は脅しの材料にされる可能性がある。一人で抱え込まず警察に相談を。",
  },
  {
    stage: "段階④",
    title: "仕事を一度やってしまった",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700",
    steps: [
      "今すぐ連絡を断ち、やり取りの証拠（スクリーンショット）を保存する",
      "弁護士に無料相談する（法テラス：0570-078374）",
      "弁護士と相談のうえ、警察への自首・捜査協力を検討する",
    ],
    note: "自首・早期の捜査協力により刑事処分が軽減されるケースがあります。一人で決断しないで。",
  },
];

const CONTACTS = [
  { name: "警察安全相談電話", number: "#9110", hours: "24時間・匿名可", desc: "勧誘を受けた・脅されている・知人が関与しているかもしれないなど、警察への相談はここから。" },
  { name: "法テラス（日本司法支援センター）", number: "0570-078374", hours: "平日9〜21時・土9〜17時", desc: "弁護士への無料法律相談。収入要件あり。闇バイトへの関与・債務整理など幅広く対応。" },
  { name: "よりそいホットライン", number: "0120-279-338", hours: "24時間・無料", desc: "生活困窮・DV・自殺念慮など、あらゆる悩みに対応。闇バイトに追い込まれた状況でも相談可。" },
  { name: "消費者ホットライン", number: "188（いやや）", hours: "年中無休", desc: "詐欺被害・悪質商法への対応。被害金の回復についても案内してもらえる。" },
];

export default function KotowarikatPage() {
  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <header className="bg-slate-950 text-white py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-black text-lg">
            <span className="text-red-500">Safe</span><span className="text-white">Bite</span>
          </Link>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">← トップページへ</Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* パンくず */}
        <nav className="text-xs text-slate-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-slate-700">SafeBite</Link>
          <span>/</span>
          <span className="text-slate-700 font-bold">闇バイトの断り方</span>
        </nav>

        {/* ヒーロー */}
        <div className="mb-10">
          <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-green-200">
            🛡️ 安全に抜け出す方法
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            闇バイトの<br className="sm:hidden" />断り方・辞め方
          </h1>

          {/* 一言で言うと（AEO・AI検索最適化） */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">一言で言うと</div>
            <p className="text-base font-bold text-slate-800 leading-snug">
              「法律の専門家に相談します」と伝えてすぐにブロック・連絡を断つ。脅しは脅迫罪なので怖がらなくてよい。
            </p>
          </div>

          <p className="text-slate-600 text-base leading-relaxed mb-6">
            「断ったら家族に連絡する」「個人情報は把握している」——これは闇バイトグループが関与者を辞めさせないための
            <strong className="text-slate-900">常套手段（脅迫罪）</strong>です。<br />
            脅されていても、必ず安全に抜け出せます。段階別に解説します。
          </p>
          <div className="bg-red-600 rounded-2xl p-5 text-white">
            <p className="text-xs font-bold mb-1 opacity-80">今すぐ相談できます（匿名・無料）</p>
            <p className="text-3xl font-black mb-1">#9110</p>
            <p className="text-xs opacity-80">警察安全相談電話 ／ 24時間対応</p>
          </div>
        </div>

        {/* 段階別の断り方 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-6">状況別の断り方・辞め方</h2>
          <div className="flex flex-col gap-5">
            {STEPS.map((s) => (
              <div key={s.stage} className={`rounded-2xl border p-6 ${s.color}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-black px-3 py-1 rounded-full ${s.badge}`}>{s.stage}</span>
                  <h3 className="text-base font-black text-slate-800">{s.title}</h3>
                </div>
                <ol className="flex flex-col gap-2 mb-3">
                  {s.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white border border-current flex items-center justify-center text-xs font-black">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                {s.note && (
                  <p className="text-xs text-slate-600 bg-white/60 rounded-xl px-3 py-2 leading-relaxed">
                    💡 {s.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 脅された場合 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-4">「辞めたら家族に連絡する」と脅された場合</h2>
          <div className="bg-slate-950 rounded-2xl p-6 text-white mb-4">
            <p className="text-sm leading-relaxed">
              この脅しは<strong className="text-red-400">脅迫罪・恐喝罪（懲役3〜10年）</strong>に該当する犯罪です。<br />
              脅した側が法律違反を犯しており、あなたは被害者として警察に保護を求める権利があります。
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {[
              "脅迫メッセージのスクリーンショットを撮る（証拠保全）",
              "警察安全相談電話（#9110）または最寄りの警察署に相談する",
              "「自分も犯罪に加担した」場合は弁護士（法テラス）に相談してから警察へ",
              "絶対に要求には応じない——応じると要求はエスカレートするだけ",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 text-sm text-slate-700">
                <span className="text-green-600 font-black flex-shrink-0">✓</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-slate-950 rounded-2xl p-8 text-center mb-10">
          <h3 className="text-lg font-black text-white mb-2">怪しい求人かどうか迷ったら</h3>
          <p className="text-slate-400 text-sm mb-5">求人文をAIに貼り付けるだけで危険度を即判定（無料・匿名）</p>
          <Link href="/#checker" className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3.5 rounded-xl transition-all">
            無料で危険度チェックする →
          </Link>
        </div>

        {/* 相談窓口 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-4">今すぐ使える相談窓口</h2>
          <div className="flex flex-col gap-4">
            {CONTACTS.map((c) => (
              <div key={c.name} className="border border-slate-100 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                  <h3 className="text-sm font-black text-slate-800">{c.name}</h3>
                  <span className="text-xl font-black text-red-600 flex-shrink-0">{c.number}</span>
                </div>
                <p className="text-xs text-slate-400 mb-1">📅 {c.hours}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 関連ガイド */}
        <section className="border border-slate-100 rounded-2xl p-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">関連ガイド</div>
          <div className="flex flex-col gap-3">
            {[
              { href: "/guide/higai-soudan", title: "被害に遭ったらやること", desc: "相談窓口・証拠保全の手順" },
              { href: "/guide/taiho-jirei", title: "逮捕・判決事例まとめ", desc: "末端でも実刑になる現実" },
              { href: "/glossary/yamibaitomiwakekata", title: "闇バイトの見分け方", desc: "5つのシグナルチェックリスト" },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="group flex items-center justify-between bg-slate-50 hover:bg-red-50 border border-slate-100 hover:border-red-100 rounded-xl p-4 transition-all">
                <div>
                  <div className="text-sm font-bold text-slate-700 group-hover:text-red-600 transition-colors">{g.title}</div>
                  <div className="text-xs text-slate-400">{g.desc}</div>
                </div>
                <span className="text-slate-300 group-hover:text-red-400 transition-colors">→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-500 py-8 px-4 text-center text-sm mt-12">
        <Link href="/" className="font-black text-base mb-2 block">
          <span className="text-red-500">Safe</span><span className="text-white">Bite</span>
        </Link>
        © 2026 SafeBite Project — すべての人が安全に働ける社会のために
      </footer>
    </div>
  );
}
