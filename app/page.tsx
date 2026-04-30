"use client";

import { useState, useEffect } from "react";

const YAMI_KEYWORDS = [
  "UD", "ホワイト案件", "受け子", "出し子", "叩き", "飛ばし", "名義貸し",
  "転がし", "ホワ案", "テレグラム", "Telegram", "即日払い", "身バレなし",
  "顔出し不要", "高収入保証", "前払い", "誰でもOK", "裏バイト", "闇バイト",
  "架け子", "書き子", "受け取り",
];

const REPORT_TARGETS = [
  {
    name: "インターネット・ホットラインセンター（IHC）",
    desc: "警察庁委託の公式窓口。闇バイト募集投稿を直接通報できます",
    url: "https://www.internethotline.jp/",
    tag: "最推奨",
    accent: "text-red-400 border-red-500/30 bg-red-500/10",
  },
  {
    name: "都道府県警察 サイバー犯罪相談窓口",
    desc: "各都道府県警察のサイバー相談窓口一覧。巻き込まれた場合はこちら",
    url: "https://www.npa.go.jp/bureau/cyber/soudan.html",
    tag: "相談窓口",
    accent: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  },
  {
    name: "X（Twitter）公式通報フォーム",
    desc: "X上の違法コンテンツを通報。「詐欺・不正」カテゴリを選択",
    url: "https://help.x.com/ja/rules-and-policies/x-report-violation",
    tag: "X専用",
    accent: "text-slate-300 border-slate-500/30 bg-slate-500/10",
  },
  {
    name: "総務省 違法・有害情報相談センター",
    desc: "SNS投稿の削除申請・相談窓口",
    url: "https://ihaho.jp/",
    tag: "削除申請",
    accent: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  },
];

// ============================================================
// NAV
// ============================================================

const SHARE_URL = "https://safebite-zeta.vercel.app";
const VC_ARUBAITO_EX_URL = "https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3769365&pid=892604584";
const VC_ARUBAITO_EX_PIXEL = "https://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3769365&pid=892604584";
const SHARE_TEXT = "【無料】そのバイト、大丈夫？AIが求人文をコピペするだけで闇バイトを即判定。通報支援・SOS相談テンプレも。";

function ShareButtons({ compact = false }: { compact?: boolean }) {
  const xUrl =
    "https://x.com/intent/tweet?text=" +
    encodeURIComponent(SHARE_TEXT) +
    "&url=" +
    encodeURIComponent(SHARE_URL);
  const lineUrl =
    "https://social-plugins.line.me/lineit/share?url=" +
    encodeURIComponent(SHARE_URL) +
    "&text=" +
    encodeURIComponent(SHARE_TEXT);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-white/8 hover:bg-white/15 border border-white/10 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all"
        >
          𝕏 シェア
        </a>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-[#06C755]/15 hover:bg-[#06C755]/25 border border-[#06C755]/30 text-[#06C755] font-bold px-3 py-1.5 rounded-lg text-xs transition-all"
        >
          LINE
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-bold text-slate-300">
        身近な人に教えてください — あなたのシェアが1人を救うかもしれません
      </p>
      <div className="flex gap-3 flex-wrap">
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-black px-5 py-3 rounded-xl text-sm transition-all"
        >
          𝕏 Xでシェアする
        </a>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34b] text-white font-black px-5 py-3 rounded-xl text-sm transition-all"
        >
          <span className="text-base leading-none">💬</span>
          LINEで友達に教える
        </a>
      </div>
    </div>
  );
}

function NavBar() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="font-black text-lg tracking-tight">
          <span className="text-red-500">Safe</span>
          <span className="text-white">Bite</span>
        </div>
        <div className="flex items-center gap-0.5 text-xs font-bold flex-wrap justify-end">
          {[
            { id: "checker", label: "危険度チェック" },
            { id: "report",  label: "通報ハブ" },
            { id: "sos",     label: "SOS" },
            { id: "jobs",    label: "安全な求人" },
          ].map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {n.label}
            </button>
          ))}
          <a
            href="/glossary"
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            隠語辞典
          </a>
          <div className="ml-2 hidden sm:flex">
            <ShareButtons compact />
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============================================================
// QUICK ESCAPE
// ============================================================

function QuickEscape() {
  return (
    <button
      onClick={() => { window.location.href = "https://weather.yahoo.co.jp/weather/"; }}
      aria-label="画面を今すぐ隠す"
      className="fixed bottom-5 right-5 z-50 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl transition-all flex flex-col items-center gap-1"
    >
      <span className="text-base leading-none">👁</span>
      <span className="text-[10px] tracking-wide">今すぐ隠す</span>
    </button>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-14 bg-slate-950 relative overflow-hidden">
      {/* 背景グロー */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg mx-auto w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-400 text-xs font-bold px-4 py-2 rounded-full mb-8 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          AI危険度チェッカー搭載・無料・匿名
        </div>

        <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight tracking-tight mb-4">
          そのバイト、<br />
          <span className="text-red-500">大丈夫？</span>
        </h1>

        <p className="text-slate-400 text-base leading-relaxed mb-10">
          求人文をコピペするだけ。<br />AIが<strong className="text-white">即座に</strong>危険度を判定します。
        </p>

        {/* 3アクションボタン */}
        <div className="flex flex-col gap-3 mb-10">
          <button
            onClick={() => scrollTo("checker")}
            className="group w-full bg-red-500 hover:bg-red-400 text-white font-black py-5 rounded-2xl text-lg transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-3"
          >
            <span className="text-2xl">🔍</span>
            危険度チェック（コピペするだけ）
          </button>
          <button
            onClick={() => scrollTo("sos")}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-5 rounded-2xl text-lg transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3"
          >
            <span className="text-2xl">🆘</span>
            今すぐ逃げたい・相談する
          </button>
          <button
            onClick={() => scrollTo("jobs")}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-5 rounded-2xl text-lg transition-all flex items-center justify-center gap-3"
          >
            <span className="text-2xl">💼</span>
            安全なバイトを探す
          </button>
        </div>

        {/* 信頼バッジ */}
        <div className="bg-white/5 border border-white/8 rounded-2xl p-4 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-emerald-400 text-sm">🔒</span>
            <span className="text-xs font-bold text-white">このサイトは安全です</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {[
              "入力文章はサーバーに一切保存されません",
              "個人情報の収集・販売は行いません",
              "警察・行政機関への通報支援が目的の公益サービス",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-500 flex-shrink-0">✓</span>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* 統計 */}
        <div className="flex gap-3 justify-center flex-wrap mt-8">
          {[
            { n: "50人超",   label: "2024年以降の逮捕者数" },
            { n: "26億円",   label: "2025年広島県の被害額" },
            { n: "10代の3割", label: "闇バイト募集を見たことがある" },
          ].map(({ n, label }) => (
            <div key={n} className="bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-center">
              <div className="text-lg font-black text-red-400">{n}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION LABEL helper
// ============================================================

function SectionLabel({ children, color = "slate" }: { children: React.ReactNode; color?: string }) {
  const cls: Record<string, string> = {
    slate:   "bg-slate-100 text-slate-600",
    red:     "bg-red-50 text-red-600",
    emerald: "bg-emerald-50 text-emerald-700",
    blue:    "bg-blue-50 text-blue-700",
    amber:   "bg-amber-50 text-amber-700",
  };
  return (
    <div className={"inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase " + (cls[color] ?? cls.slate)}>
      {children}
    </div>
  );
}

// ============================================================
// AI CHECKER
// ============================================================

function CheckerSection() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    score: number; verdict: string; reasons: string[];
    keywords: string[]; advice: string; should_report: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!text.trim() || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type: "analyze" }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch {
      setError("分析中にエラーが発生しました。再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = !result ? "slate" : result.score >= 70 ? "red" : result.score >= 40 ? "amber" : "emerald";
  const colorMap: Record<string, { ring: string; text: string; bg: string; badge: string; border: string }> = {
    red:    { ring: "ring-red-500/30",    text: "text-red-500",    bg: "bg-red-500/5",    badge: "bg-red-500/10 text-red-400",    border: "border-red-500/20"    },
    amber:  { ring: "ring-amber-500/30",  text: "text-amber-500",  bg: "bg-amber-500/5",  badge: "bg-amber-500/10 text-amber-400",  border: "border-amber-500/20"  },
    emerald:{ ring: "ring-emerald-500/30",text: "text-emerald-500",bg: "bg-emerald-500/5",badge: "bg-emerald-500/10 text-emerald-400",border:"border-emerald-500/20"},
    slate:  { ring: "ring-slate-200",     text: "text-slate-500",  bg: "bg-slate-50",     badge: "bg-slate-100 text-slate-500",     border: "border-slate-200"     },
  };
  const c = colorMap[scoreColor];

  const regex = new RegExp(
    "(" + YAMI_KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")",
    "gi"
  );
  const highlighted = text
    ? text.split(regex).map((part, i) =>
        YAMI_KEYWORDS.some((k) => k.toLowerCase() === part.toLowerCase())
          ? <mark key={i} className="bg-red-500/15 text-red-400 rounded px-0.5 font-bold not-italic">{part}</mark>
          : <span key={i}>{part}</span>
      )
    : null;

  return (
    <section id="checker" className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <SectionLabel color="amber">機能① AI危険度チェッカー</SectionLabel>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">求人文を貼るだけで瞬時判定</h2>
          <p className="text-slate-500 text-sm">SNSのDM・投稿文をそのまま貼り付けてください</p>
        </div>

        <div className={"border rounded-2xl overflow-hidden mb-4 transition-all " + (text ? "border-slate-300 ring-2 ring-slate-200" : "border-slate-200")}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"例）「高収入日払い！誰でもOK、Telegram誘導。身バレなし。1日5万保証」\n\n↑このようなテキストをここに貼り付け"}
            rows={5}
            className="w-full p-5 text-slate-800 text-sm leading-relaxed resize-y outline-none bg-white placeholder:text-slate-300"
          />
          {text && (
            <div className="px-5 pb-4 pt-3 text-sm leading-relaxed border-t border-slate-100 text-slate-600 bg-slate-50">
              {highlighted}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-xs text-slate-400">{text.length} 文字</span>
          <button
            onClick={analyze}
            disabled={!text.trim() || loading}
            className="bg-slate-900 hover:bg-slate-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm"
          >
            {loading ? "分析中..." : "危険度を判定する →"}
          </button>
        </div>

        {loading && (
          <div className="text-center py-12 text-slate-400">
            <div className="w-10 h-10 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm">AIが解析中...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-red-600 text-sm">{error}</div>
        )}

        {result && !loading && (
          <div className={"border rounded-2xl overflow-hidden ring-1 " + c.border + " " + c.ring}>
            {/* スコアヘッダー */}
            <div className={"p-6 flex gap-6 items-center border-b " + c.bg + " " + c.border}>
              <div className="text-center">
                <div className={"text-6xl font-black tabular-nums " + c.text}>{result.score}</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">/ 100</div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">危険度判定</div>
                <div className={"text-2xl font-black tracking-tight " + c.text}>{result.verdict}</div>
              </div>
            </div>

            {result.keywords && result.keywords.length > 0 && (
              <div className="p-5 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">検知キーワード</div>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((kw, i) => (
                    <span key={i} className={"text-xs font-bold px-3 py-1 rounded-full " + c.badge}>{kw}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-5 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">判定理由</div>
              {result.reasons?.map((r, i) => (
                <div key={i} className="flex gap-3 mb-2 text-sm text-slate-700">
                  <span className={"font-bold flex-shrink-0 " + c.text}>▸</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>

            <div className="p-5">
              <div className={"border rounded-xl p-4 text-sm text-slate-700 leading-relaxed " + c.bg + " " + c.border}>
                💡 {result.advice}
              </div>
              {result.should_report && (
                <button
                  onClick={() => document.getElementById("report")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-all text-sm"
                >
                  🚨 この投稿を警察庁・IHCへ通報する →
                </button>
              )}
            </div>
          </div>
        )}

        <p className="text-xs text-slate-400 text-center mt-5 leading-relaxed">
          入力テキストはAI判定後に即廃棄。サーバー保存・ログ記録なし。<br />
          AI判定は参考情報です。最終判断は公的機関にご相談ください。
        </p>
      </div>
    </section>
  );
}

// ============================================================
// REPORT HUB
// ============================================================

function ReportHubSection() {
  const [platform, setPlatform] = useState("X（Twitter）");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    is_illegal: boolean; category: string; ihc_report_text: string;
    police_report_text: string; evidence_checklist: string[]; urgency: string;
  } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const platforms = ["X（Twitter）", "Instagram", "TikTok", "LINE", "Telegram", "その他"];

  const generate = async () => {
    if (!text.trim() || loading) return;
    setLoading(true); setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: "プラットフォーム：" + platform + "\nURL：" + (url || "不明") + "\n投稿内容：\n" + text,
          type: "report",
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch { /* silent */ } finally { setLoading(false); }
  };

  return (
    <section id="report" className="py-20 px-4 bg-slate-950">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <SectionLabel color="red">機能② 市民通報ハブ</SectionLabel>
          <h2 className="text-3xl font-black text-white tracking-tight mb-3">大元を直接通報する</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            怪しい投稿を貼るだけで、AIが通報文を自動生成します
          </p>
        </div>

        {/* 通報先カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {REPORT_TARGETS.map((t) => (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-xl p-4 transition-all block group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-white leading-tight pr-2 group-hover:text-white">{t.name}</span>
                <span className={"text-xs font-bold px-2 py-0.5 rounded-md border flex-shrink-0 " + t.accent}>{t.tag}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-2">{t.desc}</p>
              <span className="text-xs font-bold text-slate-500 group-hover:text-slate-300 transition-colors">通報ページを開く →</span>
            </a>
          ))}
        </div>

        {/* AI通報文生成 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-6">
          <div className="p-5 border-b border-white/8">
            <div className="font-bold text-white mb-1 text-sm">🤖 AI通報文ジェネレーター</div>
            <div className="text-xs text-slate-400">
              投稿内容を貼り付けると、IHC・警察に提出できる通報文をAIが自動生成します
            </div>
          </div>

          <div className="p-5 flex flex-col gap-4">
            <div>
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">発見したプラットフォーム</div>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={"px-3 py-1.5 rounded-lg text-xs font-bold border transition-all " +
                      (platform === p
                        ? "bg-white text-slate-900 border-white"
                        : "bg-transparent text-slate-400 border-white/20 hover:border-white/40")}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">投稿URL（任意）</div>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://x.com/..."
                className="w-full bg-white/5 border border-white/15 focus:border-white/40 rounded-xl p-3 text-sm text-white outline-none placeholder:text-slate-600 transition-all"
              />
            </div>

            <div>
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">投稿内容・DMテキスト（必須）</div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="怪しいと感じた投稿・DMの内容をそのまま貼り付けてください"
                rows={5}
                className="w-full bg-white/5 border border-white/15 focus:border-white/40 rounded-xl p-3 text-sm text-white leading-relaxed resize-none outline-none placeholder:text-slate-600 transition-all"
              />
            </div>

            <button
              onClick={generate}
              disabled={!text.trim() || loading}
              className="bg-red-500 hover:bg-red-400 disabled:bg-white/10 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition-all text-sm"
            >
              {loading ? "通報文を生成中..." : "通報文をAIで自動生成する →"}
            </button>
          </div>
        </div>

        {result && (
          <div className="flex flex-col gap-4">
            <div className={"rounded-xl p-4 border flex gap-3 items-start " +
              (result.is_illegal ? "bg-red-500/10 border-red-500/30" : "bg-emerald-500/10 border-emerald-500/30")}>
              <span className="text-2xl">{result.is_illegal ? "🚨" : "ℹ️"}</span>
              <div>
                <div className={"font-bold mb-1 text-sm " + (result.is_illegal ? "text-red-400" : "text-emerald-400")}>
                  {result.is_illegal ? "違法情報の可能性あり — 通報を強く推奨します" : "違法性は低めですが、念のため通報可能です"}
                </div>
                <div className="text-xs text-slate-400">カテゴリ：{result.category}　緊急度：{result.urgency}</div>
              </div>
            </div>

            <div className="bg-white/5 border border-amber-500/20 rounded-xl p-4">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">📋 通報前に確認すること</div>
              {result.evidence_checklist?.map((item, i) => (
                <div key={i} className="flex gap-2 mb-2 text-sm text-slate-300">
                  <span className="text-emerald-400 font-bold flex-shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <ReportTextCard
              title="IHC（インターネット・ホットラインセンター）への通報文"
              text={result.ihc_report_text}
              actionLabel="IHCで通報する"
              actionUrl="https://www.internethotline.jp/"
              accent="red"
              onSubmit={() => setSubmitted(true)}
            />

            <ReportTextCard
              title="都道府県警察 サイバー犯罪相談窓口への相談文"
              text={result.police_report_text}
              actionLabel="地元警察の相談窓口を探す"
              actionUrl="https://www.npa.go.jp/bureau/cyber/soudan.html"
              accent="blue"
              onSubmit={() => setSubmitted(true)}
            />

            {submitted && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                <div className="font-bold text-emerald-400 mb-1 text-sm">✅ 通報手続きを開始しました</div>
                <div className="text-xs text-slate-400">あなたの行動が闇バイト組織の摘発に貢献します。</div>
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-slate-500 text-center mt-6 leading-relaxed">
          ⚠️ 通報内容はSafeBiteサーバーに保存されません。各通報先へ直接ご送付ください。
        </p>
      </div>
    </section>
  );
}

function ReportTextCard({
  title, text, actionLabel, actionUrl, accent, onSubmit,
}: {
  title: string; text: string; actionLabel: string; actionUrl: string; accent: string; onSubmit: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const border = accent === "red" ? "border-red-500/20" : "border-blue-500/20";
  const labelColor = accent === "red" ? "text-red-400" : "text-blue-400";
  const btnColor = accent === "red"
    ? "text-red-400 border-red-500/30 hover:bg-red-500/10"
    : "text-blue-400 border-blue-500/30 hover:bg-blue-500/10";

  return (
    <div className={"bg-white/5 border rounded-xl overflow-hidden " + border}>
      <div className={"p-3 border-b flex justify-between items-center " + border}>
        <span className={"text-xs font-bold " + labelColor}>{title}</span>
        <button
          onClick={copy}
          className={"text-xs font-bold px-3 py-1.5 rounded-lg border transition-all " +
            (copied ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-white/5 text-slate-400 border-white/15 hover:bg-white/10")}
        >
          {copied ? "コピー完了 ✓" : "コピー"}
        </button>
      </div>
      <div className="p-4 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap border-b border-white/8">{text}</div>
      <div className="p-3">
        <a
          href={actionUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSubmit}
          className={"inline-block border font-bold px-4 py-2 rounded-lg text-xs transition-all " + btnColor}
        >
          {actionLabel} →
        </a>
      </div>
    </div>
  );
}

// ============================================================
// SOS
// ============================================================

function SOSSection() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ when: "", what: "", whom: "", current: "" });
  const [template, setTemplate] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fields = [
    { key: "when",    label: "いつ、どこで関わり始めましたか？",  placeholder: "例）2025年5月頃、InstagramのDMで声をかけられた" },
    { key: "what",    label: "何をしてしまいましたか？",          placeholder: "例）免許証の写真を送った。一度荷物を受け取って渡した" },
    { key: "whom",    label: "相手はどんな人ですか？",            placeholder: "例）Telegramの匿名アカウント。本名・顔は不明" },
    { key: "current", label: "今の状況を教えてください",          placeholder: "例）逃げたら家族に連絡すると脅されている" },
  ];

  const contacts = [
    { name: "警察相談専用",         num: "#9110",        tel: "9110",       desc: "24時間受付" },
    { name: "法テラス",             num: "0570-078374",  tel: "0570078374", desc: "無料法律相談" },
    { name: "よりそいホットライン", num: "0120-279-338", tel: "0120279338", desc: "24時間・無料" },
  ];

  const generate = async () => {
    setLoading(true);
    const prompt =
      "いつ：" + form.when + "\n何をしたか：" + form.what +
      "\n相手：" + form.whom + "\n現状：" + form.current;
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: prompt, type: "sos" }),
      });
      const data = await res.json();
      setTemplate(data.text || "生成エラー。直接#9110へお電話ください。");
      setStep(5);
    } catch {
      setTemplate("エラーが発生しました。直接警察（#9110）へお電話ください。");
      setStep(5);
    } finally { setLoading(false); }
  };

  return (
    <section id="sos" className="py-20 px-4 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <SectionLabel color="emerald">機能③ 駆け込みSOS</SectionLabel>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">まだ間に合う。今すぐ抜け出せます</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            4問答えるだけで警察・法テラスに持参できる<br />
            <strong className="text-slate-700">説明文</strong>を自動生成します
          </p>
        </div>

        {/* 緊急連絡先 */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {contacts.map((c) => (
            <a
              key={c.name}
              href={"tel:" + c.tel}
              className="bg-white hover:bg-emerald-50 border-2 border-slate-100 hover:border-emerald-200 rounded-xl p-4 text-center transition-all block"
            >
              <div className="text-xs text-slate-400 mb-1">{c.name}</div>
              <div className="text-base font-black text-emerald-600">{c.num}</div>
              <div className="text-xs text-slate-400 mt-1">{c.desc}</div>
            </a>
          ))}
        </div>

        {step < 4 && (
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400 font-bold">質問 {step + 1} / {fields.length}</span>
                <span className="text-xs text-slate-400">{Math.round((step + 1) / fields.length * 100)}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: ((step + 1) / fields.length * 100) + "%" }}
                />
              </div>
            </div>
            <div className="p-6">
              <label className="block text-base font-bold text-slate-800 mb-3">{fields[step].label}</label>
              <textarea
                value={form[fields[step].key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [fields[step].key]: e.target.value })}
                placeholder={fields[step].placeholder}
                rows={4}
                className="w-full border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl p-3 text-sm text-slate-700 leading-relaxed resize-none outline-none transition-all"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => step === fields.length - 1 ? generate() : setStep(step + 1)}
                  className="bg-slate-900 hover:bg-slate-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all text-sm"
                >
                  {step === fields.length - 1 ? "相談テンプレを生成する" : "次へ →"}
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-12 text-slate-400">
            <div className="w-10 h-10 border-2 border-slate-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm">相談テンプレを生成中...</p>
          </div>
        )}

        {step === 5 && template && (
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <span className="text-sm font-bold text-emerald-600">相談テンプレが完成しました</span>
              <button
                onClick={() => { navigator.clipboard.writeText(template); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className={"text-xs font-bold px-4 py-2 rounded-lg transition-all " +
                  (copied ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}
              >
                {copied ? "コピー完了" : "コピー"}
              </button>
            </div>
            <div className="p-5 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{template}</div>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// JOBS
// ============================================================

function JobsSection() {
  const jobs = [
    { title: "引越し・軽作業スタッフ", pay: "時給1,500〜2,000円",     style: "日払いOK・週1〜",         tag: "体力系" },
    { title: "フードデリバリー",        pay: "時給換算1,200〜2,500円", style: "完全フレックス・即日振込", tag: "配達"   },
    { title: "コールセンター（受信）",  pay: "時給1,300〜1,800円",     style: "シフト自由・研修あり",     tag: "在宅可" },
    { title: "イベントスタッフ",        pay: "日給12,000〜18,000円",   style: "単発OK・日払い対応多数",   tag: "単発"   },
    { title: "工場・倉庫ピッキング",    pay: "時給1,200〜1,600円",     style: "未経験OK・日払いあり",     tag: "安定"   },
    { title: "飲食店ホールスタッフ",    pay: "時給1,100〜1,500円",     style: "週1〜・シフト融通あり",    tag: "定番"   },
  ];

  return (
    <section id="jobs" className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <SectionLabel color="blue">機能④ ホワイト求人</SectionLabel>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">今すぐ安全に稼げる求人</h2>
          <p className="text-slate-500 text-sm">日払い・即日スタート可能な安全な求人をご紹介</p>
        </div>

        {/* アルバイトEX メインCTA */}
        <a
          href={VC_ARUBAITO_EX_URL}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="flex items-center justify-between bg-blue-600 hover:bg-blue-500 rounded-2xl p-5 mb-6 transition-all group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={VC_ARUBAITO_EX_PIXEL} height={1} width={1} alt="" style={{ display: "none" }} />
          <div>
            <div className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">有名バイトメディア20社を一括比較</div>
            <div className="text-lg font-black text-white">アルバイトEXで安全な求人を探す</div>
            <div className="text-xs text-blue-200 mt-1">マッハバイト・タウンワーク・シフトワークスなど180万件以上</div>
          </div>
          <span className="text-white text-2xl group-hover:translate-x-1 transition-transform">→</span>
        </a>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {jobs.map((j, i) => (
            <div key={i} className="bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm rounded-2xl p-5 transition-all flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-slate-800 leading-tight text-sm">{j.title}</span>
                <span className="text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-md px-2 py-0.5 ml-2 flex-shrink-0">{j.tag}</span>
              </div>
              <div className="text-emerald-600 font-black text-sm mb-1">{j.pay}</div>
              <div className="text-xs text-slate-400 mb-4">{j.style}</div>
              <a
                href={VC_ARUBAITO_EX_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="mt-auto text-xs font-bold text-blue-600 hover:text-blue-800 border border-blue-100 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-2 text-center transition-all"
              >
                求人を探す →
              </a>
            </div>
          ))}
        </div>

        {/* 安全な求人の見分け方 */}
        <div className="bg-slate-950 rounded-2xl p-6 mb-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">✅ 安全な求人を見分ける3つの基準</div>
          <div className="flex flex-col gap-4">
            {[
              { icon: "🏢", title: "運営元が明確", desc: "会社名・住所・電話番号が公開されている。上場企業や大手プラットフォーム掲載の求人はリスクが低い。" },
              { icon: "📋", title: "面接・登録手続きがある", desc: "身元確認・面接なしで即日高収入を謳う求人は危険。正規の仕事は必ず採用プロセスがある。" },
              { icon: "💳", title: "給与が銀行振込", desc: "現金手渡し・暗号資産・ギフト券払いは詐欺の証拠。正規の会社は銀行振込で給与を支払う。" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <div className="text-sm font-bold text-white mb-1">{title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-slate-100 rounded-2xl p-6 text-center">
          <div className="text-sm font-bold text-slate-700 mb-4">他の求人サイトでも探す</div>
          <div className="flex gap-3 justify-center flex-wrap">
            {[
              { label: "求人ボックス", url: "https://xn--pckua2a7gp15o89zb.com/", affiliate: false },
              { label: "ハローワーク", url: "https://www.hellowork.mhlw.go.jp/",  affiliate: false },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
              >
                {s.label} →
              </a>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center mt-4">
          ※ アルバイトEXは有名求人サイト20社を一括検索できる安全なサービスです。
        </p>
      </div>
    </section>
  );
}

// ============================================================
// NEWS
// ============================================================

type NewsItem = { title: string; link: string; pubDate: string; source: string };

function NewsSection() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (str: string) => {
    try { return new Date(str).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" }); }
    catch { return ""; }
  };

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <SectionLabel color="slate">最近の逮捕事例</SectionLabel>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">闇バイト関連ニュース</h2>
          <p className="text-slate-500 text-sm">実際の逮捕事例を知ることが最大の抑止力です</p>
        </div>

        {loading && (
          <div className="text-center py-10 text-slate-400">
            <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs">ニュースを取得中...</p>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="flex flex-col gap-2">
            {items.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-xl p-4 flex gap-4 items-start transition-all group"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-slate-100 group-hover:bg-red-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-red-500 font-black text-xs transition-all">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-800 group-hover:text-slate-900 leading-snug mb-1 line-clamp-2">{item.title}</div>
                  <div className="flex gap-3 text-xs text-slate-400">
                    {item.source && <span>{item.source}</span>}
                    {item.pubDate && <span>{formatDate(item.pubDate)}</span>}
                  </div>
                </div>
                <span className="text-slate-200 group-hover:text-slate-400 text-xs flex-shrink-0 self-center transition-all">→</span>
              </a>
            ))}
          </div>
        )}

        <p className="text-xs text-slate-400 text-center mt-4">※ Google ニュースから自動取得しています</p>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT
// ============================================================

function AboutSection() {
  return (
    <section className="py-16 px-4 bg-white border-t border-slate-100">
      <div className="max-w-2xl mx-auto text-center">
        <SectionLabel color="slate">このサービスについて</SectionLabel>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
          「知らなかった」で人生を<br />棒に振ってほしくない
        </h2>
        <p className="text-slate-500 text-sm leading-loose mb-8 text-left max-w-lg mx-auto">
          SafeBiteは、闇バイト撲滅を目的とした<strong className="text-slate-700">公益・非営利のWebサービス</strong>です。<br /><br />
          「手っ取り早く稼ぎたい」という気持ちは、決して悪いことではありません。
          しかし、その気持ちにつけ込む犯罪組織が存在します。<br /><br />
          一度関与してしまうと、脅迫・逮捕・前科という取り返しのつかない結果を招きます。
          このサービスは、そうした悪の連鎖に介入するために作られました。
          入力された情報は一切保存されず、広告目的での利用も行いません。
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          {[
            { icon: "🔒", text: "個人情報の収集なし" },
            { icon: "🛡️", text: "公益・非営利目的" },
            { icon: "🤖", text: "AI判定は参考情報" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-slate-600 font-bold text-sm">
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-500 py-12 px-4 text-xs leading-relaxed">
      <div className="max-w-2xl mx-auto">
        {/* シェアCTA */}
        <div className="bg-white/5 border border-white/8 rounded-2xl p-6 mb-10">
          <ShareButtons />
        </div>

        <div className="text-center">
          <div className="font-black text-base mb-3">
            <span className="text-red-500">Safe</span>
            <span className="text-white">Bite</span>
          </div>
          <div className="flex gap-4 justify-center mb-4 flex-wrap">
            <a href="/glossary" className="hover:text-slate-300 transition-colors">闇バイト隠語辞典</a>
          </div>
          <p className="text-slate-600 leading-relaxed">
            SafeBiteは闇バイト撲滅を目的とした公益Webサービスです。<br />
            AI判定は参考情報であり法的根拠を保証しません。入力情報はサーバーに保存されません。<br /><br />
            © 2025 SafeBite Project — すべての人が安全に働ける社会のために
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// ROOT
// ============================================================

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <CheckerSection />
      <ReportHubSection />
      <SOSSection />
      <JobsSection />
      <NewsSection />
      <AboutSection />
      <Footer />
      <QuickEscape />
    </main>
  );
}
