// サーバーコンポーネント — "use client" なし
// ヒーローの静的コンテンツ（h1・説明文・統計）はSSRで描画される
import NavBar         from "./_components/NavBar";
import HeroTextarea   from "./_components/HeroTextarea";
import HeroSubActions from "./_components/HeroSubActions";
import ImpactCounter  from "./_components/ImpactCounter";
import CheckerSection from "./_components/CheckerSection";
import ReportHubSection from "./_components/ReportHubSection";
import SOSSection     from "./_components/SOSSection";
import GuideSection   from "./_components/GuideSection";
import JobsSection    from "./_components/JobsSection";
import NewsSection    from "./_components/NewsSection";
import AboutSection   from "./_components/AboutSection";
import Footer         from "./_components/Footer";
import QuickEscape    from "./_components/QuickEscape";

// ── Schema.org JSON-LD ────────────────────────────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SafeBite",
  url: "https://saferbite.org",
  description:
    "闇バイト・詐欺求人の危険度をAIが即座に判定する公益Webサービス。隠語辞典・通報ハブ・相談先もまとめています。",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://saferbite.org/glossary?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SafeBite AI危険度チェッカー",
  url: "https://saferbite.org/#checker",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  description:
    "怪しいバイト求人の文章を貼り付けるとAI（Gemini）が即座に危険度を判定し、闇バイトかどうかを解説します。無料・匿名で利用可能。",
  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
  provider: {
    "@type": "Organization",
    name: "SafeBite",
    url: "https://saferbite.org",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SafeBite",
  url: "https://saferbite.org",
  logo: "https://saferbite.org/opengraph-image",
  sameAs: ["https://x.com/SafeBiteJP"],
  description: "闇バイト撲滅を目的とした公益Webサービス。AIによる求人危険度チェック・隠語辞典・通報支援を無料提供。",
};

export default function Home() {
  return (
    <main>
      {/* Schema.org JSON-LD */}
      {[websiteSchema, appSchema, orgSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <NavBar />

      {/* ══ HERO ══════════════════════════════════════════════
          h1・説明文・信頼バッジ・統計 → サーバーレンダリング済み
          テキストエリア・ボタン・スクロールリンク → クライアントアイランド
      ═══════════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-14 bg-gradient-to-br from-white via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* 背景グロー */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-lg mx-auto w-full text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            無料・匿名・入力内容は保存なし
          </div>

          {/* ── SEO的に最重要な h1 ── サーバー描画 */}
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-3">
            そのバイト募集、<br />
            <span className="text-red-500">本当に大丈夫？</span>
          </h1>

          <p className="text-slate-600 text-sm leading-relaxed mb-5">
            怪しいDM・求人文を<strong className="text-slate-900">ここにコピペするだけ。</strong><br />
            AIが危険度をすぐ判定します。
          </p>

          {/* クライアントアイランド: textarea + 判定ボタン */}
          <HeroTextarea />

          {/* クライアントアイランド: スクロールリンク */}
          <HeroSubActions />

          {/* 信頼バッジ — サーバー描画 */}
          <div className="bg-white/80 border border-blue-100 rounded-2xl p-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-400 text-sm">🔒</span>
              <span className="text-xs font-bold text-slate-800">このサイトは安全です</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                "入力文章はサーバーに一切保存されません",
                "個人情報の収集・販売は行いません",
                "警察・行政機関への通報支援が目的の公益サービス",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="text-emerald-500 flex-shrink-0">✓</span>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* 統計 — サーバー描画 */}
          <div className="flex gap-3 justify-center flex-wrap mt-6">
            {[
              { n: "1,000人超",   label: "2024〜2025年の闇バイト逮捕者数" },
              { n: "2,000億円超", label: "2024年の特殊詐欺被害総額（警察庁）" },
              { n: "10代の3割",   label: "闇バイト募集を見たことがある" },
            ].map(({ n, label }) => (
              <div key={n} className="bg-white/80 border border-blue-100 rounded-xl px-4 py-3 text-center">
                <div className="text-lg font-black text-blue-600">{n}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* クライアントアイランド: ライブカウンター */}
          <ImpactCounter />
        </div>
      </section>

      {/* ── 各機能セクション ─────────────────────────────── */}
      <CheckerSection />     {/* client */}
      <ReportHubSection />   {/* client */}
      <SOSSection />         {/* client */}
      <GuideSection />       {/* server */}
      <JobsSection />        {/* client */}
      <NewsSection />        {/* async server — SSR + 1時間キャッシュ */}
      <AboutSection />       {/* server */}
      <Footer />             {/* client */}
      <QuickEscape />        {/* client */}
    </main>
  );
}
