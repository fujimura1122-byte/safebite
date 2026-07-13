import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://saferbite.org";
const PAGE_URL = `${BASE_URL}/guide/fukugyo-sagi`;

export const metadata: Metadata = {
  title: "【2026年版】副業詐欺の手口と見分け方｜「簡単に稼げる」の罠｜SafeBite",
  description:
    "「スマホで簡単に稼げる」副業の多くは詐欺です。LINE誘導・情報商材・タスク詐欺・荷受け代行など最新の手口と見分け方、だまされた時の返金相談先を解説します。",
  keywords:
    "副業詐欺 手口,副業 詐欺 見分け方,簡単 副業 稼げる 嘘,副業 詐欺 返金,スマホ 副業 危険,副業 詐欺 相談",
  alternates: { canonical: "/guide/fukugyo-sagi" },
  openGraph: {
    title: "【2026年版】副業詐欺の手口と見分け方｜「簡単に稼げる」の罠",
    description:
      "「スマホで簡単に稼げる」副業の多くは詐欺。最新の手口・見分け方・返金相談先を解説します。",
    url: PAGE_URL,
    siteName: "SafeBite",
    locale: "ja_JP",
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "【2026年版】副業詐欺の手口と見分け方｜「簡単に稼げる」の罠｜SafeBite",
    description: "「スマホで簡単に稼げる」副業の多くは詐欺。手口と見分け方を解説。",
    images: ["/opengraph-image"],
  },
};

// ── Schema.org JSON-LD ────────────────────────────────────────────────────────
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "【2026年版】副業詐欺の手口と見分け方｜「簡単に稼げる」の罠",
  description:
    "「スマホで簡単に稼げる」副業の多くは詐欺です。最新の手口と見分け方、だまされた時の返金相談先を解説します。",
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
      name: "副業詐欺かどうかを見分けるポイントは？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "「初期費用・登録料を先に払わせる」「LINEやTelegramに誘導する」「作業内容が曖昧なのに高収入を約束する」「すぐに大金が稼げると強調する」のいずれかがあれば詐欺を強く疑ってください。正規の仕事は働く側がお金を先に払うことはありません。",
      },
    },
    {
      "@type": "Question",
      name: "副業詐欺でお金を払ってしまいました。返金できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "まず消費者ホットライン（188）に相談してください。クレジットカード決済ならカード会社に「チャージバック（異議申立て）」を、契約直後ならクーリングオフが使える場合があります。証拠（やり取り・振込明細）を保存し、早めに国民生活センターや弁護士に相談することが重要です。",
      },
    },
    {
      "@type": "Question",
      name: "「荷物を受け取るだけ」の副業は安全ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "危険です。「荷受け代行」「荷物の受け取り・転送」をうたう副業は、特殊詐欺の受け子や不正商品の転送に使われる闇バイトである可能性が高く、関与すると詐欺罪などに問われます。SafeBiteのAIチェッカーで求人文の危険度を無料で確認できます。",
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
    { "@type": "ListItem", position: 3, name: "副業詐欺の手口と見分け方", item: PAGE_URL },
  ],
};

// ── 手口データ ────────────────────────────────────────────────────────────────
const TRICKS = [
  {
    icon: "💬",
    name: "LINE・Telegram誘導型",
    how: "SNS広告やDMから「詳細はLINEで」と外部チャットへ誘導。個人アカウントとやり取りさせ、証拠を残しにくくする。",
    danger: "闇バイトの入口としても最多。公式サイトや会社情報がなくチャットだけで完結するのは危険。",
  },
  {
    icon: "📦",
    name: "情報商材・マニュアル販売型",
    how: "「稼ぐ方法を教える」として数万〜数十万円の教材・オンラインサロンを販売。中身は無価値で追加課金を迫られる。",
    danger: "「初月から○○万円」「再現性100%」は誇大広告。稼げる方法を有料で売る必要はない。",
  },
  {
    icon: "⭐",
    name: "タスク・口コミバイト型",
    how: "「いいね・レビューを押すだけ」で報酬。最初は少額が振り込まれ信用させ、途中で「まとめて出金するには保証金が必要」と払わせる。",
    danger: "少額の入金は罠。出金に条件（前払い・課金）がつく時点で詐欺確定。",
  },
  {
    icon: "🏦",
    name: "前払い・登録料型",
    how: "「登録料」「システム利用料」「保証金」などを先に払わせて連絡が取れなくなる。",
    danger: "働く側がお金を払う仕事は存在しない。前払い要求は100%詐欺と考えてよい。",
  },
  {
    icon: "🚚",
    name: "荷受け代行型（闇バイト直結）",
    how: "「送られてくる荷物を受け取って転送するだけ」。実態は特殊詐欺の受け子・不正商品の転送。",
    danger: "犯罪への加担そのもの。詐欺罪・古物営業法違反等で逮捕リスク。最も危険。",
  },
  {
    icon: "💳",
    name: "口座・名義買取型（闇バイト直結）",
    how: "「使わない銀行口座・携帯を売るだけで現金」。買い取った口座は詐欺の振込先に使われる。",
    danger: "口座・SIMの譲渡は犯罪収益移転防止法違反。売った本人も処罰される。",
  },
];

const CHECKLIST = [
  "登録料・保証金・システム利用料など、先にお金を払う必要がある",
  "「誰でも」「スマホだけで」「簡単に」高収入を約束している",
  "仕事の具体的な内容・会社名・所在地が説明されない",
  "LINE・Telegramなど個人チャットに誘導される",
  "「荷物の受け取り・転送」「口座・SIMの貸与」が含まれる",
  "最初に少額が振り込まれ、出金に追加の支払いを求められる",
  "「今だけ」「残りわずか」と契約を急がされる",
];

export default function FukugyoSagiPage() {
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
          <span className="font-bold text-slate-700">副業詐欺の手口と見分け方</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-2">
          副業詐欺の手口と<br />見分け方
        </h1>
        <p className="text-xs text-slate-400 mb-4">最終更新：2026年7月</p>

        {/* 一言で言うと（AEO） */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">一言で言うと</div>
          <p className="text-base font-bold text-slate-800 leading-snug">
            働く側が先にお金を払う「副業」はすべて詐欺。特に「荷受け代行」「口座買取」は闇バイトそのもの。迷ったらAIチェッカーで無料判定を。
          </p>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-10">
          「スマホだけで日給3万円」「誰でも簡単に稼げる」——SNSにあふれるこうした副業の多くは、
          <strong className="text-slate-800">お金をだまし取る詐欺</strong>か、
          <strong className="text-slate-800">気づかぬうちに犯罪に加担させる闇バイト</strong>です。
          手口を知れば、ほとんどは応募する前に見抜けます。
        </p>

        {/* 手口一覧 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-2">よくある副業詐欺の6つの手口</h2>
          <p className="text-sm text-slate-500 mb-5">下2つは「詐欺」を超えて、あなた自身が逮捕される闇バイトです。</p>
          <div className="flex flex-col gap-4">
            {TRICKS.map((t) => (
              <div key={t.name} className="border border-slate-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-2xl flex-shrink-0">{t.icon}</span>
                  <span className="text-base font-black text-slate-900">{t.name}</span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-black text-slate-400 flex-shrink-0 w-10 text-xs mt-0.5">手口</span>
                    <span className="text-slate-700 leading-relaxed">{t.how}</span>
                  </div>
                  <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-3 mt-1">
                    <span className="text-red-400 font-black text-xs flex-shrink-0 mt-0.5">⚠</span>
                    <span className="text-red-800 text-xs leading-relaxed">{t.danger}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* チェックリスト */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-2">危険な副業を見分けるチェックリスト</h2>
          <p className="text-sm text-slate-500 mb-4">1つでも当てはまれば応募しないでください。</p>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            {CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-4 border-b border-slate-100 last:border-0">
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
              <p className="text-white text-xs font-bold mb-0.5">その求人・DMをAIでチェック</p>
              <p className="text-slate-400 text-xs">文章を貼り付けるだけで危険度を無料判定（匿名）</p>
            </div>
            <Link
              href="/#checker"
              className="ml-auto bg-red-500 hover:bg-red-400 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all flex-shrink-0"
            >
              チェック →
            </Link>
          </div>
        </section>

        {/* だまされたら */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-4">お金を払ってしまったら（返金の相談先）</h2>
          <div className="flex flex-col gap-3">
            {[
              { step: "証拠を保存する", desc: "やり取り（LINE・メール）、振込明細、広告のスクリーンショットをすべて保存。" },
              { step: "消費者ホットライン 188 に電話", desc: "最寄りの消費生活センターにつながる。返金・クーリングオフの可否を無料で相談できる。" },
              { step: "決済会社に連絡", desc: "クレジットカード決済ならカード会社に異議申立て（チャージバック）。早いほど通りやすい。" },
              { step: "国民生活センター・弁護士へ", desc: "被害額が大きい場合は国民生活センターや弁護士に相談。集団被害では返金事例もある。" },
            ].map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-950 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 mb-0.5">{s.step}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 bg-amber-500 rounded-2xl p-5 text-white text-center">
            <p className="text-sm font-bold mb-1">消費者トラブルの相談は</p>
            <p className="text-3xl font-black mb-1 tracking-widest">188</p>
            <p className="text-xs opacity-90">消費者ホットライン（いやや！）— 局番なしで発信</p>
          </div>
        </section>

        {/* よくある誤解 */}
        <section className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-4">よくある誤解</h2>
          <div className="flex flex-col gap-3">
            {[
              {
                myth: "「少額しか払っていないから大丈夫」",
                truth: "少額の入金で信用させ、後から高額を請求するのが典型手口。1円でも払ったら相談を。",
              },
              {
                myth: "「荷物を受け取るだけなら詐欺じゃない」",
                truth: "荷受け代行は特殊詐欺の受け子そのもの。だます側でなく、あなたが逮捕される側になる。",
              },
              {
                myth: "「有名人・公式っぽいから本物」",
                truth: "著名人の写真やロゴの無断使用（なりすまし広告）が横行。見た目で判断してはいけない。",
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

        {/* 安全な探し方CTA */}
        <div className="bg-slate-950 rounded-2xl p-8 text-center mb-8">
          <h3 className="text-lg font-black text-white mb-2">安全に稼げる仕事を探すなら</h3>
          <p className="text-slate-400 text-sm mb-5">
            会社情報が明確で、前払い不要の正規求人だけを選びましょう。
          </p>
          <Link
            href="/#jobs"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
          >
            安全な求人の探し方を見る →
          </Link>
        </div>

        {/* 関連ガイド */}
        <div className="border border-slate-100 rounded-2xl p-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">関連ガイド</div>
          <div className="flex flex-col gap-3">
            {[
              {
                href: "/#checker",
                title: "AI危険度チェッカー",
                desc: "求人文・DMを貼るだけで闇バイト度を無料判定",
              },
              {
                href: "/guide/shakkin-deguchi",
                title: "借金で闇バイトに手を出す前に",
                desc: "お金に困ったときの合法の出口（債務整理）",
              },
              {
                href: "/guide/taiho-jirei",
                title: "闇バイト逮捕・判決事例まとめ",
                desc: "「副業のつもりだった」でも実刑になる現実",
              },
              {
                href: "/glossary",
                title: "闇バイト隠語辞典 100語",
                desc: "求人に潜む隠語の意味・危険性",
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
