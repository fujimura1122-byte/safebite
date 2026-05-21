import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://saferbite.org";

export const metadata: Metadata = {
  title: "闇バイト被害に遭ったら最初にやること｜相談先・対処法まとめ｜SafeBite",
  description:
    "闇バイトに関わってしまった・脅されている・個人情報を取られた場合の対処法を段階別に解説。警察・法テラス・よりそいホットラインなど無料相談窓口もまとめています。",
  keywords:
    "闇バイト 被害 相談,闇バイト 関わってしまった,闇バイト 警察 相談,闇バイト 個人情報 取られた,闇バイト 脅された 対処法,闇バイト 逃げ方,闇バイト 抜け方",
  alternates: { canonical: "/guide/higai-soudan" },
  openGraph: {
    title: "闇バイト被害に遭ったら最初にやること｜相談先・対処法まとめ",
    description:
      "闇バイトに関わってしまった・脅されている場合の緊急対処法と相談窓口。一人で抱え込まないでください。",
    url: `${BASE_URL}/guide/higai-soudan`,
    siteName: "SafeBite",
    locale: "ja_JP",
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "闇バイト被害に遭ったら最初にやること｜SafeBite",
    description: "闇バイトに関わってしまった場合の緊急対処法と相談窓口まとめ。",
    images: ["/opengraph-image"],
  },
};

// ── Schema.org JSON-LD ────────────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "闇バイト被害に遭ったら最初にやること｜相談先・対処法まとめ",
  description:
    "闇バイトに関わってしまった・脅されている場合の緊急対処法と相談窓口。段階別に解説します。",
  url: `${BASE_URL}/guide/higai-soudan`,
  dateModified: "2026-05-21",
  author: { "@type": "Organization", name: "SafeBite", url: BASE_URL },
  publisher: {
    "@type": "Organization",
    name: "SafeBite",
    url: BASE_URL,
    logo: { "@type": "ImageObject", url: `${BASE_URL}/opengraph-image` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/guide/higai-soudan` },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "闇バイトに関わってしまった場合、自首すれば罪が軽くなりますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "自首・自発的な情報提供は、裁判所が量刑を判断する際に有利に働く重要な要素です。指示役・組織の情報を捜査機関に提供することで、執行猶予や起訴猶予（不起訴）につながるケースもあります。まず弁護士に相談してから警察に出頭することをお勧めします。",
      },
    },
    {
      "@type": "Question",
      name: "闇バイトを断ったら脅されました。どうすればいいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "脅迫・強要は犯罪です。証拠（スクリーンショット）を保存し、警察安全相談電話（#9110）または最寄りの警察署に相談してください。弁護士（法テラス 0570-078374）に相談すれば、法的保護措置についてアドバイスを受けられます。一人で対応しようとしないことが重要です。",
      },
    },
    {
      "@type": "Question",
      name: "個人情報（免許証・マイナンバー）を送ってしまいました。どうすればいいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "マイナンバーカードを送付した場合は市区町村窓口で再発行手続きと番号変更を申請してください。免許証は運転免許センターで紛失届を出し、悪用の可能性を申告してください。クレジットカードや銀行口座番号を教えた場合は即座に発行元に連絡して停止を依頼してください。警察（#9110）への相談も忘れずに。",
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
      name: "闇バイト被害に遭ったらやること",
      item: `${BASE_URL}/guide/higai-soudan`,
    },
  ],
};

// ── 対処法ステップ ──────────────────────────────────────────────────────────
const STEPS = [
  {
    stage: "STEP 1",
    title: "まず安全を確保する",
    color: "border-red-500 bg-red-50",
    labelColor: "text-red-600",
    items: [
      {
        icon: "📵",
        text: "指示役・関係者との連絡を一切断つ",
        note: "ただし証拠保全のためトーク履歴は消さない",
      },
      {
        icon: "🏠",
        text: "指定された場所・仕事場には絶対に行かない",
        note: "「もう1回だけ」は罠です",
      },
      {
        icon: "📸",
        text: "やり取りのスクリーンショットをすべて保存する",
        note: "日時・送信者名が写るように撮影",
      },
      {
        icon: "🔇",
        text: "SNSアカウントをすぐに非公開にする",
        note: "報復・特定リスクを下げるため",
      },
    ],
  },
  {
    stage: "STEP 2",
    title: "信頼できる大人・専門家に相談する",
    color: "border-orange-500 bg-orange-50",
    labelColor: "text-orange-600",
    items: [
      {
        icon: "👨‍👩‍👧",
        text: "家族・学校の先生など信頼できる大人に話す",
        note: "一人で抱え込むのが最も危険",
      },
      {
        icon: "⚖️",
        text: "弁護士に相談する（法テラス：0570-078374）",
        note: "自首の方法・量刑軽減の可能性をアドバイスしてもらえる",
      },
      {
        icon: "📞",
        text: "警察安全相談電話（#9110）に連絡する",
        note: "相談だけなら即逮捕にはなりません",
      },
      {
        icon: "💬",
        text: "よりそいホットライン（0120-279-338）に電話する",
        note: "24時間・無料・匿名でOK",
      },
    ],
  },
  {
    stage: "STEP 3",
    title: "個人情報の悪用を止める",
    color: "border-yellow-500 bg-yellow-50",
    labelColor: "text-yellow-700",
    items: [
      {
        icon: "🪪",
        text: "マイナンバーカードを送った → 市区町村窓口で再発行・番号変更申請",
        note: "「個人番号変更申請」が可能",
      },
      {
        icon: "🚗",
        text: "運転免許証を送った → 運転免許センターで紛失届",
        note: "悪用の可能性を申告する",
      },
      {
        icon: "💳",
        text: "カード番号・口座情報を教えた → 即座に金融機関に連絡して停止",
        note: "24時間対応の紛失・盗難ダイヤルを使う",
      },
      {
        icon: "📱",
        text: "電話番号・住所が特定された → 弁護士に相談し、必要であれば転居も検討",
        note: "",
      },
    ],
  },
  {
    stage: "STEP 4",
    title: "法的手続きを進める",
    color: "border-blue-500 bg-blue-50",
    labelColor: "text-blue-600",
    items: [
      {
        icon: "👮",
        text: "弁護士同行で自首・事情聴取",
        note: "自首は量刑に有利に働きます",
      },
      {
        icon: "📋",
        text: "被害届・告訴状の提出（脅迫・強要を受けた場合）",
        note: "証拠をまとめておく",
      },
      {
        icon: "🏛️",
        text: "被害者支援センターへ連絡",
        note: "各都道府県の「犯罪被害者支援センター」",
      },
      {
        icon: "💰",
        text: "経済的困窮がある場合は生活保護・緊急小口資金も検討",
        note: "法テラスで案内してもらえます",
      },
    ],
  },
];

const CONTACTS = [
  {
    name: "警察安全相談電話",
    number: "#9110",
    hours: "24時間対応",
    note: "最寄りの警察署相談窓口につながります",
    color: "bg-red-600",
  },
  {
    name: "法テラス（日本司法支援センター）",
    number: "0570-078374",
    hours: "平日 9〜21時 / 土 9〜17時",
    note: "収入が少なくても無料で弁護士に相談できます",
    color: "bg-indigo-600",
  },
  {
    name: "よりそいホットライン",
    number: "0120-279-338",
    hours: "24時間・無料",
    note: "話しにくいことでもフラットに相談できます",
    color: "bg-teal-600",
  },
  {
    name: "消費者ホットライン",
    number: "188",
    hours: "原則 8〜20時",
    note: "詐欺求人・悪質勧誘の被害相談",
    color: "bg-amber-600",
  },
];

export default function HigaiSoudanPage() {
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
          <span className="text-slate-700 font-bold">闇バイト被害に遭ったらやること</span>
        </nav>

        {/* 緊急CTA */}
        <div className="mb-8 bg-red-600 rounded-2xl p-6 text-white text-center">
          <p className="text-sm font-bold mb-1">今すぐ相談できます（匿名・無料）</p>
          <p className="text-4xl font-black mb-1 tracking-widest">#9110</p>
          <p className="text-xs opacity-80 mb-4">警察安全相談電話 — 24時間対応</p>
          <p className="text-xs opacity-90">
            相談するだけでは逮捕されません。まず話を聞いてもらうだけでも大丈夫です。
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-3">
          闇バイト被害に遭ったら<br />最初にやること
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          「知らずに関わってしまった」「断れずに仕事をしてしまった」「個人情報を送ってしまった」——
          一人で抱え込まないでください。<br />
          <strong className="text-slate-800">早期相談が最も重要です。</strong>状況別に対処法をまとめました。
        </p>

        {/* ステップ */}
        <div className="flex flex-col gap-6 mb-12">
          {STEPS.map((step) => (
            <div key={step.stage} className={`border-l-4 rounded-2xl p-6 ${step.color}`}>
              <div className={`text-xs font-black uppercase tracking-widest mb-1 ${step.labelColor}`}>
                {step.stage}
              </div>
              <h2 className="text-lg font-black text-slate-900 mb-4">{step.title}</h2>
              <ul className="flex flex-col gap-3">
                {step.items.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-800 leading-snug">{item.text}</p>
                      {item.note && (
                        <p className="text-xs text-slate-500 mt-0.5">{item.note}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 「脅された場合」強調ボックス */}
        <div className="bg-slate-950 rounded-2xl p-6 mb-12">
          <h2 className="text-lg font-black text-white mb-4">
            🚨 脅されている場合の緊急対処
          </h2>
          <div className="flex flex-col gap-3 text-sm">
            {[
              {
                label: "証拠を保存する",
                text: "脅迫メッセージのスクリーンショットを撮り、クラウドにバックアップ。",
              },
              {
                label: "一人で会いに行かない",
                text: "「話し合いしよう」「来なければどうなるかわかるな」は罠。絶対に単独で行動しない。",
              },
              {
                label: "警察に相談する",
                text: "脅迫・恐喝・強要は立派な犯罪。あなたは被害者でもあります。",
              },
              {
                label: "SNSを非公開にする",
                text: "特定・嫌がらせリスクを減らすため、すぐに設定を変更する。",
              },
            ].map(({ label, text }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="text-red-400 font-black text-xs mt-0.5 flex-shrink-0">▶</span>
                <div>
                  <span className="text-white font-bold text-xs">{label}：</span>
                  <span className="text-slate-400 text-xs leading-relaxed">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 相談窓口 */}
        <h2 className="text-xl font-black text-slate-900 mb-4">無料相談窓口まとめ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {CONTACTS.map((c) => (
            <div key={c.name} className={`${c.color} rounded-2xl p-5 text-white`}>
              <p className="text-xs font-bold opacity-80 mb-1">{c.name}</p>
              <p className="text-2xl font-black tracking-widest mb-1">{c.number}</p>
              <p className="text-xs opacity-70 mb-2">{c.hours}</p>
              <p className="text-xs opacity-90 leading-relaxed">{c.note}</p>
            </div>
          ))}
        </div>

        {/* よくある不安 */}
        <div className="border border-slate-100 rounded-2xl p-6 mb-12">
          <h2 className="text-lg font-black text-slate-900 mb-4">
            よくある不安・Q&amp;A
          </h2>
          <div className="flex flex-col gap-5">
            {[
              {
                q: "相談したら即逮捕されますか？",
                a: "相談しただけで逮捕されることはありません。警察安全相談電話（#9110）や法テラスへの相談は匿名でも可能です。まず状況を話してみてください。",
              },
              {
                q: "自首すれば罪が軽くなりますか？",
                a: "自首・自発的な情報提供は量刑判断で有利に働きます。初犯・実行前相談・組織情報提供などの条件が重なれば、不起訴・執行猶予の可能性もあります。弁護士に相談してから出頭するのがベストです。",
              },
              {
                q: "家族にバレたくないのですが……",
                a: "法テラスやよりそいホットラインは匿名で相談できます。ただし、重大な事態の場合は家族の協力が解決を早める場合が多いです。弁護士を間に挟む方法もあります。",
              },
              {
                q: "お金を受け取ってしまいました。返せば罪になりませんか？",
                a: "報酬の受け取りだけでも犯罪になる可能性があります。ただし、返金・協力姿勢は情状酌量に働きます。まず弁護士に相談してください。",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <p className="text-sm font-black text-slate-800 mb-1">Q. {q}</p>
                <p className="text-sm text-slate-600 leading-relaxed pl-4 border-l-2 border-slate-200">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-950 rounded-2xl p-8 text-center mb-8">
          <h3 className="text-lg font-black text-white mb-2">
            怪しい求人をチェックしたい場合
          </h3>
          <p className="text-slate-400 text-sm mb-5">
            SafeBiteのAI危険度チェッカーで無料・匿名で判定できます
          </p>
          <Link
            href="/#checker"
            className="inline-block bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
          >
            無料で危険度チェックする →
          </Link>
          <p className="text-xs text-slate-500 mt-3">入力した文章はサーバーに保存されません</p>
        </div>

        {/* 関連ガイド */}
        <div className="border border-slate-100 rounded-2xl p-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            関連ガイド
          </div>
          <div className="flex flex-col gap-3">
            {[
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
                href: "/guide/taiho-jirei",
                title: "逮捕・判決事例まとめ",
                desc: "「知らなかった」では済まない実際の判決事例",
              },
              {
                href: "/glossary/yamibaitomiwakekata",
                title: "闇バイトの見分け方（隠語辞典）",
                desc: "UD・ホワ案など怪しい求人のサインを解説",
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
