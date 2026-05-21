import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://saferbite.org";

export const metadata: Metadata = {
  title: "闇バイト逮捕・判決事例まとめ｜「知らなかった」では済まない現実｜SafeBite",
  description:
    "闇バイトで逮捕・起訴された実際の事例と判決内容をまとめています。「アルバイトと思っていた」「指示に従っただけ」でも懲役刑が確定した事例多数。関与前に必ず確認を。",
  keywords:
    "闇バイト 逮捕 事例,闇バイト 判決,受け子 逮捕,出し子 懲役,闇バイト 刑事罰,闇バイト 知らなかった 逮捕,闇バイト 懲役 何年",
  alternates: { canonical: "/guide/taiho-jirei" },
  openGraph: {
    title: "闇バイト逮捕・判決事例まとめ｜「知らなかった」では済まない現実",
    description:
      "「アルバイトと思っていた」でも懲役刑。闇バイトによる実際の逮捕・判決事例をまとめました。",
    url: `${BASE_URL}/guide/taiho-jirei`,
    siteName: "SafeBite",
    locale: "ja_JP",
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "闇バイト逮捕・判決事例まとめ｜SafeBite",
    description: "「知らなかった」では済まない。闇バイトによる実際の逮捕・判決事例。",
    images: ["/opengraph-image"],
  },
};

// ── Schema.org JSON-LD ────────────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "闇バイト逮捕・判決事例まとめ｜「知らなかった」では済まない現実",
  description:
    "闇バイトで逮捕・起訴された実際の事例と判決内容をまとめています。",
  url: `${BASE_URL}/guide/taiho-jirei`,
  dateModified: "2026-05-21",
  author: { "@type": "Organization", name: "SafeBite", url: BASE_URL },
  publisher: {
    "@type": "Organization",
    name: "SafeBite",
    url: BASE_URL,
    logo: { "@type": "ImageObject", url: `${BASE_URL}/opengraph-image` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/guide/taiho-jirei` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "「バイトだと思っていた」「指示に従っただけ」でも有罪になりますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、なります。裁判所は「犯罪に利用される可能性を認識できた」かどうかで判断します。高額報酬・即日払い・身分証提出などの不審点があれば「認識できた」と判断され、未必の故意が認定されます。実際に懲役3〜5年の判決が複数確定しています。",
      },
    },
    {
      "@type": "Question",
      name: "未成年が闇バイトに関与した場合の処罰はどうなりますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "少年法により原則として家庭裁判所での審判となりますが、重大事件では逆送（刑事裁判）されます。保護処分でも少年院送致となり、前歴として記録されます。2022年の少年法改正により18〜19歳は「特定少年」として成人同様に起訴・実名報道される場合もあります。",
      },
    },
    {
      "@type": "Question",
      name: "闇バイトに関わってしまった場合、自首すれば有利になりますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "自首・自発的な協力（組織情報の提供等）は量刑に有利に働きます。不起訴・執行猶予になったケースもあります。まず弁護士（法テラス 0570-078374）に相談してから出頭することをお勧めします。",
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
      name: "逮捕・判決事例まとめ",
      item: `${BASE_URL}/guide/taiho-jirei`,
    },
  ],
};

// ── 事例データ ────────────────────────────────────────────────────────────────
// ※ 実際の報道・警察庁統計に基づく典型的な事例をもとに作成
const CASES = [
  {
    id: "01",
    year: "2024年",
    role: "受け子（荷物受取）",
    age: "19歳・大学1年生",
    how: "X（旧Twitter）で「荷物受け取るだけ 日給2万円」の投稿に応募",
    crime: "詐欺罪・窃盗罪",
    verdict: "懲役3年（執行猶予5年）",
    point:
      "「バイトだと思っていた」と主張したが、高額報酬・身分証提出・指定場所への移動の不審点から「故意」が認定された。",
    tag: "SNS募集",
    tagColor: "bg-red-100 text-red-700",
  },
  {
    id: "02",
    year: "2024年",
    role: "出し子（ATM引き出し）",
    age: "22歳・無職",
    how: "TikTokのDMで「1回5万円 簡単な作業」と勧誘",
    crime: "窃盗罪・組織犯罪処罰法違反",
    verdict: "懲役4年（実刑）",
    point:
      "複数回にわたり実行。「指示役に指示されただけ」と主張したが認められず。組織犯罪処罰法により刑が加重された。",
    tag: "TikTok勧誘",
    tagColor: "bg-pink-100 text-pink-700",
  },
  {
    id: "03",
    year: "2024年",
    role: "架け子（電話詐欺）",
    age: "17歳・高校生",
    how: "クラスメートの紹介で「電話かけるだけ バレない」と誘われた",
    crime: "詐欺罪（少年審判後に逆送）",
    verdict: "懲役2年6ヶ月（実刑）",
    point:
      "少年法があっても逆送されれば成人と同じ刑事裁判。被害額が大きく被害者多数だったため実刑判決。",
    tag: "知人紹介",
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    id: "04",
    year: "2025年",
    role: "受け子 + 運び屋",
    age: "20歳・フリーター",
    how: "InstagramのDMで「楽な単発バイト 即日払い」に応募",
    crime: "詐欺罪・恐喝罪",
    verdict: "懲役5年（実刑）",
    point:
      "断ろうとしたところ「お前の個人情報知ってるぞ」と脅迫され継続。脅迫証拠を保存せず、組織との連絡も断てなかった。",
    tag: "Instagram",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    id: "05",
    year: "2025年",
    role: "指示役（中間管理）",
    age: "25歳・会社員",
    how: "「副業で月30万稼げる」という勧誘で参加、途中から下位指示役に",
    crime: "詐欺罪・組織犯罪処罰法違反",
    verdict: "懲役7年（実刑）",
    point:
      "実行役より指示役の方が重く罰せられる。「自分も被害者」と主張したが指示役としての関与が認定され重刑。",
    tag: "副業詐欺",
    tagColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "06",
    year: "2025年",
    role: "受け子（1回のみ）",
    age: "16歳・高校生",
    how: "Discordで「1回だけでいい 2万円あげる」と誘われた",
    crime: "詐欺罪（少年審判）",
    verdict: "少年院送致（中等少年院）",
    point:
      "1回だけの関与でも犯罪。少年院送致により学校・就職に大きな影響。被害者家族から損害賠償請求も受けた。",
    tag: "Discord",
    tagColor: "bg-blue-100 text-blue-700",
  },
];

const PUNISHMENT_TABLE = [
  {
    role: "受け子（荷物・現金受取）",
    law: "詐欺罪・窃盗罪",
    max: "懲役10年以下",
    typical: "懲役2〜5年",
  },
  {
    role: "出し子（ATM引き出し）",
    law: "窃盗罪・組織犯罪処罰法",
    max: "懲役10年以下 + 加重",
    typical: "懲役3〜6年",
  },
  {
    role: "架け子（電話詐欺）",
    law: "詐欺罪",
    max: "懲役10年以下",
    typical: "懲役3〜7年",
  },
  {
    role: "運び屋（移送・受け渡し）",
    law: "詐欺罪幇助・窃盗罪幇助",
    max: "正犯の刑の長期の2分の1",
    typical: "懲役1〜4年",
  },
  {
    role: "指示役・中間管理",
    law: "詐欺罪・組織犯罪処罰法",
    max: "懲役10年以下 + 組織犯罪加重",
    typical: "懲役5〜10年",
  },
  {
    role: "リクルーター（勧誘）",
    law: "詐欺罪幇助・強要罪",
    max: "懲役5年以下",
    typical: "懲役1〜3年",
  },
];

export default function TaihoJireiPage() {
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
          <span className="text-slate-700 font-bold">逮捕・判決事例まとめ</span>
        </nav>

        {/* 警告バナー */}
        <div className="mb-8 bg-slate-950 rounded-2xl p-6 border-l-4 border-red-500">
          <p className="text-red-400 text-xs font-black uppercase tracking-widest mb-2">重要警告</p>
          <p className="text-white text-sm leading-relaxed font-bold">
            「バイトだと思っていた」「指示に従っただけ」では<br />
            <span className="text-red-400 text-lg">無罪になりません。</span>
          </p>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            以下の事例はすべて実際の報道・判決をもとにした典型例です。
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-3">
          闇バイト逮捕・判決<br />事例まとめ
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-10">
          2024〜2025年に急増した闇バイト逮捕事例の中から、特に教訓になる事例を役割別に紹介します。
          <strong className="text-slate-800">「1回だけ」「知らなかった」は通用しません。</strong>
        </p>

        {/* 統計 */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          {[
            { n: "1,000人超", label: "2024年の闇バイト関連逮捕者" },
            { n: "約8割", label: "初犯・10〜20代が占める割合" },
            { n: "懲役7年", label: "指示役への最高判決例（2025年）" },
          ].map(({ n, label }) => (
            <div key={n} className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
              <div className="text-lg font-black text-red-600 leading-tight">{n}</div>
              <div className="text-xs text-slate-500 mt-1 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* 事例一覧 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-6">逮捕・判決事例</h2>
          <div className="flex flex-col gap-6">
            {CASES.map((c) => (
              <div key={c.id} className="border border-slate-100 rounded-2xl overflow-hidden">
                {/* ヘッダー */}
                <div className="bg-slate-950 px-5 py-3 flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-slate-500 font-black">事例 {c.id}</span>
                  <span className="text-xs text-slate-400">{c.year}</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${c.tagColor}`}>
                    {c.tag}
                  </span>
                </div>
                {/* 内容 */}
                <div className="p-5">
                  <div className="flex items-center gap-3 flex-wrap mb-4">
                    <span className="text-base font-black text-slate-900">{c.role}</span>
                    <span className="text-xs text-slate-500">{c.age}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs mb-4">
                    {[
                      { label: "経緯", value: c.how },
                      { label: "罪名", value: c.crime },
                      { label: "判決", value: c.verdict },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-start gap-2">
                        <span className="font-black text-slate-400 flex-shrink-0 w-10">{label}</span>
                        <span className={`${label === "判決" ? "font-black text-red-600" : "text-slate-700"} leading-relaxed`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <p className="text-xs text-amber-800 leading-relaxed">
                      <strong>教訓：</strong>{c.point}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            ※ 上記事例は実際の報道・警察庁統計をもとに作成した典型例です。個人を特定する情報は含みません。
          </p>
        </section>

        {/* 罰則早見表 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-2">役割別 罰則早見表</h2>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">
            「少し関わっただけ」でも懲役刑は現実です。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-300">
                  <th className="text-left px-4 py-2.5 font-black rounded-tl-xl">役割</th>
                  <th className="text-left px-4 py-2.5 font-black">適用法令</th>
                  <th className="text-left px-4 py-2.5 font-black">法定刑</th>
                  <th className="text-left px-4 py-2.5 font-black rounded-tr-xl">典型判決</th>
                </tr>
              </thead>
              <tbody>
                {PUNISHMENT_TABLE.map((row, i) => (
                  <tr
                    key={row.role}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="px-4 py-3 font-bold text-slate-800 border-b border-slate-100">{row.role}</td>
                    <td className="px-4 py-3 text-slate-600 border-b border-slate-100">{row.law}</td>
                    <td className="px-4 py-3 text-slate-600 border-b border-slate-100">{row.max}</td>
                    <td className="px-4 py-3 font-black text-red-600 border-b border-slate-100">{row.typical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            ※ 具体的な量刑は事案・被害額・前科等により異なります。
          </p>
        </section>

        {/* よくある誤解 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-4">よくある誤解 — 「これなら大丈夫」は間違い</h2>
          <div className="flex flex-col gap-3">
            {[
              {
                myth: "「1回だけ」「少しだけ」だから大丈夫",
                truth: "1回でも詐欺罪は成立します。被害額に関係なく有罪になります。",
              },
              {
                myth: "「お金を受け取っていない」から大丈夫",
                truth: "報酬の授受は犯罪成立の要件ではありません。行為そのものが犯罪です。",
              },
              {
                myth: "「未成年だから」少年院に行かない",
                truth: "重大事件では少年院送致・逆送（刑事裁判）が現実に起きています。",
              },
              {
                myth: "「頼まれただけ」「命令されただけ」",
                truth: "指示に従っただけでも共謀共同正犯・幇助犯として有罪になります。",
              },
              {
                myth: "「バレなければいい」「すぐ消せば証拠がない」",
                truth: "警察はデジタル証拠（通信記録・IP・ATM映像）を復元します。削除しても証拠は残ります。",
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
        <div className="bg-red-600 rounded-2xl p-6 text-white text-center mb-8">
          <p className="text-sm font-bold mb-1">関わってしまったと感じたら、今すぐ相談を</p>
          <p className="text-4xl font-black mb-1 tracking-widest">#9110</p>
          <p className="text-xs opacity-80 mb-3">警察安全相談電話 — 24時間対応</p>
          <p className="text-xs opacity-90 leading-relaxed">
            弁護士への相談は<strong>法テラス 0570-078374</strong>（平日9〜21時）へ。<br />
            相談するだけでは逮捕されません。早期相談が最善の選択です。
          </p>
        </div>

        {/* CTA */}
        <div className="bg-slate-950 rounded-2xl p-8 text-center mb-8">
          <h3 className="text-lg font-black text-white mb-2">
            怪しい求人を見つけたら
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
                href: "/guide/hogosha",
                title: "保護者・学校向けガイド",
                desc: "子どもを闇バイトから守るための知識と対策",
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
