"use client";

import { useState } from "react";

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
    color: "red",
    tag: "最推奨",
  },
  {
    name: "警察庁サイバー局オンライン受付",
    desc: "サイバー事案の通報・情報提供の公式窓口",
    url: "https://proc.npa.go.jp/",
    color: "blue",
    tag: "公式",
  },
  {
    name: "X（Twitter）公式通報フォーム",
    desc: "X上の違法コンテンツを通報。「詐欺・不正」カテゴリを選択",
    url: "https://help.twitter.com/forms/inaccessible",
    color: "gray",
    tag: "X専用",
  },
  {
    name: "総務省 違法・有害情報相談センター",
    desc: "SNS投稿の削除申請・相談窓口",
    url: "https://ihcenter.jp/",
    color: "purple",
    tag: "削除申請",
  },
];

// ============================================================
// SHARED
// ============================================================

function NavBar() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="font-black text-lg tracking-wide">
          <span className="text-red-500">Safe</span>
          <span className="text-gray-800">Bite</span>
        </div>
        <div className="flex gap-1 text-xs font-semibold flex-wrap justify-end">
          {[
            { id: "checker", label: "危険度チェック" },
            { id: "report", label: "🚨 通報ハブ" },
            { id: "sos", label: "SOS" },
            { id: "jobs", label: "安全な求人" },
          ].map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="px-3 py-1.5 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ============================================================
// HERO
// ============================================================

function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-14 bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-wider">
          AI危険度チェッカー搭載
        </div>
        <h1 className="text-5xl font-black text-gray-900 leading-tight mb-4">
          そのバイト、<br />
          <span className="text-red-500">本当に大丈夫？</span>
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          SNSで見つけた求人のテキストをコピペするだけで、<br />
          AIが<strong className="text-gray-800">0.5秒</strong>で危険度を判定します
        </p>
        <div className="flex gap-4 justify-center flex-wrap mb-12">
          {[
            { n: "50人超", label: "2024年以降の逮捕者数" },
            { n: "26億円", label: "2025年広島県だけの被害額" },
            { n: "10代の3割", label: "闇バイト募集を見たことがある" },
          ].map(({ n, label }) => (
            <div key={n} className="bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm text-center">
              <div className="text-xl font-black text-red-500">{n}</div>
              <div className="text-xs text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => scrollTo("checker")}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-red-200"
          >
            今すぐ無料で危険度チェック →
          </button>
          <button
            onClick={() => scrollTo("report")}
            className="bg-white hover:bg-red-50 text-red-500 font-bold px-8 py-4 rounded-xl text-lg border-2 border-red-200 transition-colors"
          >
            🚨 怪しい投稿を通報する
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-4">入力した文章はサーバーに保存されません</p>
      </div>
    </section>
  );
}

// ============================================================
// AI CHECKER
// ============================================================

function CheckerSection() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    verdict: string;
    reasons: string[];
    keywords: string[];
    advice: string;
    should_report: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
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

  const scoreColor = !result ? "gray" : result.score >= 70 ? "red" : result.score >= 40 ? "amber" : "green";
  const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    red:   { bg: "bg-red-50",   border: "border-red-200",   text: "text-red-600",   badge: "bg-red-100 text-red-600"    },
    amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600", badge: "bg-amber-100 text-amber-600" },
    green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-600", badge: "bg-green-100 text-green-600" },
    gray:  { bg: "bg-gray-50",  border: "border-gray-200",  text: "text-gray-600",  badge: "bg-gray-100 text-gray-600"  },
  };
  const c = colorMap[scoreColor];

  const regex = new RegExp(
    "(" + YAMI_KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")",
    "gi"
  );
  const highlighted = text
    ? text.split(regex).map((part, i) =>
        YAMI_KEYWORDS.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
          <mark key={i} className="bg-red-100 text-red-600 rounded px-0.5 font-bold">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )
    : null;

  return (
    <section id="checker" className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wider">
            機能① AI危険度チェッカー
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-3">求人文を貼るだけで瞬時判定</h2>
          <p className="text-gray-500">SNSのDM・投稿文をそのまま貼り付けてください</p>
        </div>

        <div className={"border-2 rounded-2xl overflow-hidden mb-4 transition-colors " + (text ? "border-amber-300" : "border-gray-200")}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"例）「高収入日払い！誰でもOK、Telegram誘導。身バレなし。1日5万保証」\n\n↑このようなテキストをここに貼り付け"}
            rows={5}
            className="w-full p-5 text-gray-800 text-sm leading-relaxed resize-y outline-none bg-white"
          />
          {text && (
            <div className="px-5 pb-4 pt-2 text-sm leading-relaxed border-t border-gray-100 text-gray-600">
              {highlighted}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-xs text-gray-400">{text.length} 文字</span>
          <button
            onClick={analyze}
            disabled={!text.trim() || loading}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            {loading ? "分析中..." : "危険度を判定する"}
          </button>
        </div>

        {loading && (
          <div className="text-center py-10 text-gray-400">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin mx-auto mb-4" />
            AIが解析中...
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">{error}</div>
        )}

        {result && !loading && (
          <div className={"border-2 rounded-2xl overflow-hidden " + c.border}>
            <div className={"p-6 flex gap-6 items-center border-b " + c.bg + " " + c.border}>
              <div className="text-center">
                <div className={"text-5xl font-black " + c.text}>{result.score}</div>
                <div className="text-xs text-gray-400 mt-1">/ 100</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">危険度</div>
                <div className={"text-2xl font-black " + c.text}>{result.verdict}</div>
              </div>
            </div>

            {result.keywords && result.keywords.length > 0 && (
              <div className="p-5 border-b border-gray-100">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">検知キーワード</div>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((kw, i) => (
                    <span key={i} className={"text-xs font-bold px-3 py-1 rounded-full " + c.badge}>{kw}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-5 border-b border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">判定理由</div>
              {result.reasons && result.reasons.map((r, i) => (
                <div key={i} className="flex gap-2 mb-2 text-sm text-gray-700">
                  <span className={"font-bold flex-shrink-0 " + c.text}>▸</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>

            <div className="p-5">
              <div className={"border rounded-xl p-4 text-sm text-gray-700 leading-relaxed " + c.bg + " " + c.border}>
                💡 {result.advice}
              </div>
              {result.should_report && (
                <button
                  onClick={() => document.getElementById("report")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  🚨 この投稿を警察庁・IHCへ通報する →
                </button>
              )}
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
          入力テキストはAI判定後に即廃棄。サーバー保存・ログ記録なし。<br />
          AI判定は参考情報です。最終判断は公的機関にご相談ください。
        </p>
      </div>
    </section>
  );
}

// ============================================================
// REPORT HUB（通報ハブ）
// ============================================================

function ReportHubSection() {
  const [platform, setPlatform] = useState("X（Twitter）");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    is_illegal: boolean;
    category: string;
    ihc_report_text: string;
    police_report_text: string;
    evidence_checklist: string[];
    urgency: string;
  } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const platforms = ["X（Twitter）", "Instagram", "TikTok", "LINE", "Telegram", "その他"];

  const tagColors: Record<string, string> = {
    red:    "bg-red-100 text-red-600 border-red-200",
    blue:   "bg-blue-100 text-blue-600 border-blue-200",
    gray:   "bg-gray-100 text-gray-600 border-gray-200",
    purple: "bg-purple-100 text-purple-600 border-purple-200",
  };

  const generate = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setResult(null);
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
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="report" className="py-20 px-4 bg-red-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wider">
            機能② 市民通報ハブ
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            大元を警察庁・IHCへ直接通報
          </h2>
          <p className="text-gray-500 leading-relaxed">
            怪しい投稿を貼るだけで、AIが通報文を自動生成します<br />
            <strong className="text-gray-700">警察庁・IHC・各プラットフォームへの提出を誘導</strong>します
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
              className="bg-white border-2 border-gray-100 hover:border-red-200 rounded-xl p-4 transition-colors block"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-gray-800 leading-tight pr-2">{t.name}</span>
                <span className={"text-xs font-bold px-2 py-0.5 rounded border flex-shrink-0 " + tagColors[t.color]}>
                  {t.tag}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">{t.desc}</p>
              <span className="text-xs font-bold text-red-500">通報ページを開く →</span>
            </a>
          ))}
        </div>

        {/* AI通報文生成 */}
        <div className="bg-white border-2 border-red-100 rounded-2xl overflow-hidden mb-6">
          <div className="p-5 border-b border-gray-100 bg-red-50">
            <div className="font-bold text-gray-800 mb-1">🤖 AI通報文ジェネレーター</div>
            <div className="text-xs text-gray-500">
              投稿内容を貼り付けると、IHC・警察庁に提出できる通報文をAIが自動生成します
            </div>
          </div>

          <div className="p-5 flex flex-col gap-4">
            {/* Platform */}
            <div>
              <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">発見したプラットフォーム</div>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={"px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-colors " +
                      (platform === p
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white text-gray-500 border-gray-200 hover:border-red-200")}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* URL */}
            <div>
              <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">投稿URL（任意）</div>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://x.com/..."
                className="w-full border-2 border-gray-200 focus:border-red-400 rounded-xl p-3 text-sm text-gray-700 outline-none"
              />
            </div>

            {/* Text */}
            <div>
              <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">投稿内容・DMテキスト（必須）</div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="怪しいと感じた投稿・DMの内容をそのまま貼り付けてください"
                rows={5}
                className="w-full border-2 border-gray-200 focus:border-red-400 rounded-xl p-3 text-sm text-gray-700 leading-relaxed resize-none outline-none"
              />
            </div>

            <button
              onClick={generate}
              disabled={!text.trim() || loading}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {loading ? "通報文を生成中..." : "通報文をAIで自動生成する"}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="flex flex-col gap-4">
            {/* 違法判定バナー */}
            <div className={"rounded-xl p-4 border-2 flex gap-3 items-start " +
              (result.is_illegal
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200")}>
              <span className="text-2xl">{result.is_illegal ? "🚨" : "ℹ️"}</span>
              <div>
                <div className={"font-bold mb-1 " + (result.is_illegal ? "text-red-600" : "text-green-600")}>
                  {result.is_illegal
                    ? "違法情報の可能性あり — 通報を強く推奨します"
                    : "違法性は低めですが、念のため通報可能です"}
                </div>
                <div className="text-xs text-gray-500">
                  カテゴリ：{result.category}　緊急度：{result.urgency}
                </div>
              </div>
            </div>

            {/* 証拠保全チェックリスト */}
            <div className="bg-white border-2 border-amber-200 rounded-xl p-4">
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">
                📋 通報前に確認すること
              </div>
              {result.evidence_checklist && result.evidence_checklist.map((item, i) => (
                <div key={i} className="flex gap-2 mb-2 text-sm text-gray-700">
                  <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* IHC通報文 */}
            <ReportTextCard
              title="IHC（インターネット・ホットラインセンター）への通報文"
              text={result.ihc_report_text}
              actionLabel="IHCで通報する"
              actionUrl="https://www.internethotline.jp/"
              color="red"
              onSubmit={() => setSubmitted(true)}
            />

            {/* 警察庁通報文 */}
            <ReportTextCard
              title="警察庁オンライン受付への通報文"
              text={result.police_report_text}
              actionLabel="警察庁で通報する"
              actionUrl="https://proc.npa.go.jp/"
              color="blue"
              onSubmit={() => setSubmitted(true)}
            />

            {submitted && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="font-bold text-green-600 mb-1">✅ 通報手続きを開始しました</div>
                <div className="text-sm text-gray-500 leading-relaxed">
                  あなたの行動が闇バイト組織の摘発に貢献します。
                </div>
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-6 leading-relaxed">
          ⚠️ 通報内容はSafeBiteサーバーに保存されません。各通報先へ直接ご送付ください。<br />
          誤った通報は避け、疑わしい場合は「情報提供」として送信することをお勧めします。
        </p>
      </div>
    </section>
  );
}

function ReportTextCard({
  title, text, actionLabel, actionUrl, color, onSubmit,
}: {
  title: string;
  text: string;
  actionLabel: string;
  actionUrl: string;
  color: string;
  onSubmit: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const borderColor = color === "red" ? "border-red-200" : "border-blue-200";
  const textColor = color === "red" ? "text-red-600" : "text-blue-600";
  const btnColor = color === "red"
    ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
    : "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100";

  return (
    <div className={"bg-white border-2 rounded-xl overflow-hidden " + borderColor}>
      <div className={"p-3 border-b flex justify-between items-center " + borderColor}>
        <span className={"text-xs font-bold " + textColor}>{title}</span>
        <button
          onClick={copy}
          className={"text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors " +
            (copied ? "bg-green-500 text-white border-green-500" : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200")}
        >
          {copied ? "コピー完了 ✓" : "コピー"}
        </button>
      </div>
      <div className="p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap border-b border-gray-100">
        {text}
      </div>
      <div className="p-3">
        <a
          href={actionUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSubmit}
          className={"inline-block border font-bold px-4 py-2 rounded-lg text-sm transition-colors " + btnColor}
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
    { name: "警察相談専用",         num: "#9110",        tel: "9110",        desc: "24時間受付"   },
    { name: "法テラス",             num: "0570-078374",  tel: "0570078374",  desc: "無料法律相談" },
    { name: "よりそいホットライン", num: "0120-279-338", tel: "0120279338",  desc: "24時間・無料" },
  ];

  const generate = async () => {
    setLoading(true);
    const prompt =
      "いつ：" + form.when +
      "\n何をしたか：" + form.what +
      "\n相手：" + form.whom +
      "\n現状：" + form.current;
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
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sos" className="py-20 px-4 bg-green-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wider">
            機能③ 駆け込みSOS
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-3">まだ間に合う。今すぐ抜け出せます</h2>
          <p className="text-gray-500 leading-relaxed">
            4問答えるだけで警察・法テラスに持参できる<br />
            <strong className="text-gray-700">説明文</strong>を自動生成します
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {contacts.map((c) => (
            <a
              key={c.name}
              href={"tel:" + c.tel}
              className="bg-white border-2 border-green-200 hover:border-green-400 rounded-xl p-4 text-center transition-colors block"
            >
              <div className="text-xs text-gray-400 mb-1">{c.name}</div>
              <div className="text-base font-black text-green-600">{c.num}</div>
              <div className="text-xs text-gray-400 mt-1">{c.desc}</div>
            </a>
          ))}
        </div>

        {step < 4 && (
          <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="text-xs text-gray-400 mb-2">質問 {step + 1} / {fields.length}</div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-green-400 rounded-full transition-all"
                  style={{ width: ((step + 1) / fields.length * 100) + "%" }}
                />
              </div>
            </div>
            <div className="p-5">
              <label className="block text-base font-bold text-gray-800 mb-3">{fields[step].label}</label>
              <textarea
                value={form[fields[step].key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [fields[step].key]: e.target.value })}
                placeholder={fields[step].placeholder}
                rows={4}
                className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl p-3 text-sm text-gray-700 leading-relaxed resize-none outline-none"
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => step === fields.length - 1 ? generate() : setStep(step + 1)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
                >
                  {step === fields.length - 1 ? "相談テンプレを生成する" : "次へ →"}
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-10 text-gray-400">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin mx-auto mb-4" />
            相談テンプレを生成中...
          </div>
        )}

        {step === 5 && template && (
          <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <span className="text-sm font-bold text-green-600">相談テンプレが完成しました</span>
              <button
                onClick={copy}
                className={"text-xs font-bold px-4 py-2 rounded-lg transition-colors " +
                  (copied ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}
              >
                {copied ? "コピー完了" : "コピー"}
              </button>
            </div>
            <div className="p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{template}</div>
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

  const siteLinks = [
    { label: "求人ボックス", url: "https://www.jobsearch.ne.jp/" },
    { label: "Indeed",       url: "https://jp.indeed.com/" },
    { label: "ハローワーク", url: "https://www.hellowork.mhlw.go.jp/" },
  ];

  return (
    <section id="jobs" className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wider">
            機能④ ホワイト求人
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-3">今すぐ安全に稼げる求人</h2>
          <p className="text-gray-500">日払い・即日スタート可能な安全な求人をご紹介</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {jobs.map((j, i) => (
            <div key={i} className="bg-white border-2 border-gray-100 hover:border-blue-200 rounded-xl p-5 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-gray-800 leading-tight">{j.title}</span>
                <span className="text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-md px-2 py-0.5 ml-2 flex-shrink-0">
                  {j.tag}
                </span>
              </div>
              <div className="text-green-600 font-black text-sm mb-1">{j.pay}</div>
              <div className="text-xs text-gray-400">{j.style}</div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 text-center">
          <div className="text-sm font-bold text-gray-700 mb-3">もっと多くの安全な求人を探す</div>
          <div className="flex gap-3 justify-center flex-wrap">
            {siteLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-blue-200 hover:border-blue-400 text-blue-600 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                {s.label} →
              </a>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          ※ 掲載求人は安全性を考慮した案件のみです。実際の応募は各求人サイトにてご確認ください。
        </p>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 text-center text-sm leading-relaxed">
      <div className="font-black text-lg mb-3">
        <span className="text-red-400">Safe</span>
        <span className="text-white">Bite</span>
      </div>
      SafeBiteは闇バイト撲滅を目的とした公益Webサービスです。<br />
      AI判定は参考情報であり法的根拠を保証しません。<br />
      入力情報はサーバーに保存されません。最終判断は必ず公的機関にご相談ください。<br /><br />
      © 2025 SafeBite Project — すべての人が安全に働ける社会のために
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
      <Footer />
    </main>
  );
}