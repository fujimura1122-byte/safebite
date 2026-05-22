"use client";
import { useState } from "react";
import { sendGA, incCounter } from "./tracking";
import { REPORT_TARGETS, A8_LAWYER_URL } from "./constants";

// ── 通報テキストカード ───────────────────────────────────────
function ReportTextCard({
  title, text, actionLabel, actionUrl, accent, onSubmit,
}: {
  title: string; text: string; actionLabel: string; actionUrl: string;
  accent: string; onSubmit: () => void;
}) {
  const [copied, setCopied]           = useState(false);
  const [clicked, setClicked]         = useState(false);
  const [refNum, setRefNum]           = useState("");
  const [refRegistered, setRefRegistered] = useState(false);
  const [refError, setRefError]       = useState("");

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpen = () => {
    incCounter("reports_submitted");
    onSubmit();
    sendGA(accent === "red" ? "ihc_link_opened" : "police_link_opened");
    if (accent === "red") setClicked(true);
  };

  const registerRef = () => {
    if (!/^\d{10}-\d{5}$/.test(refNum.trim())) {
      setRefError("形式が正しくありません（例: 1777579797-01007）");
      return;
    }
    incCounter("ihc_verified");
    setRefRegistered(true);
    setRefError("");
    sendGA("ihc_ref_registered");
  };

  const border     = accent === "red" ? "border-red-500/20"  : "border-blue-500/20";
  const labelColor = accent === "red" ? "text-red-400"       : "text-blue-400";
  const btnColor   = accent === "red"
    ? "text-red-400 border-red-500/30 hover:bg-red-500/10"
    : "text-blue-400 border-blue-500/30 hover:bg-blue-500/10";

  return (
    <div className={"bg-white border rounded-xl overflow-hidden shadow-sm " + border}>
      <div className={"p-3 border-b flex justify-between items-center " + border}>
        <span className={"text-xs font-bold " + labelColor}>{title}</span>
        <button
          onClick={copy}
          className={"text-xs font-bold px-3 py-1.5 rounded-lg border transition-all " +
            (copied
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100")}
        >
          {copied ? "コピー完了 ✓" : "コピー"}
        </button>
      </div>
      <div className="p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap border-b border-slate-100">
        {text}
      </div>
      <div className="p-3 flex flex-col gap-3">
        <a
          href={actionUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleOpen}
          className={"inline-block border font-bold px-4 py-2 rounded-lg text-xs transition-all " + btnColor}
        >
          {actionLabel} →
        </a>

        {clicked && !refRegistered && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="text-xs font-bold text-red-700 mb-2">
              通報完了しましたか？参照番号を登録してください
            </div>
            <div className="text-xs text-slate-600 mb-3">
              IHC通報後に表示される参照番号を入力すると、SafeBiteの「通報確認済み」実績に追加されます。番号自体は保存されません。
            </div>
            <div className="flex gap-2">
              <input
                value={refNum}
                onChange={(e) => setRefNum(e.target.value)}
                placeholder="例: 1777579797-01007"
                className="flex-1 bg-white border border-slate-200 focus:border-red-400 rounded-lg p-2 text-xs text-slate-800 outline-none placeholder:text-slate-400 transition-all font-mono"
              />
              <button
                onClick={registerRef}
                className="bg-red-500 hover:bg-red-400 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all whitespace-nowrap"
              >
                登録する
              </button>
            </div>
            {refError && <p className="text-xs text-red-400 mt-2">{refError}</p>}
          </div>
        )}
        {refRegistered && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
            <div className="text-xs font-bold text-emerald-400">
              ✅ 通報実績を登録しました。ご協力ありがとうございます。
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── 通報ハブ本体 ─────────────────────────────────────────────
export default function ReportHubSection() {
  const [platform, setPlatform] = useState("X（Twitter）");
  const [url, setUrl]           = useState("");
  const [text, setText]         = useState("");
  const [loading, setLoading]   = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [result, setResult]     = useState<{
    is_illegal: boolean; category: string; ihc_report_text: string;
    police_report_text: string; evidence_checklist: string[]; urgency: string;
  } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [tweetUrl, setTweetUrl]       = useState("");
  const [fetching, setFetching]       = useState(false);
  const [fetchError, setFetchError]   = useState("");
  const [fetchedAuthor, setFetchedAuthor] = useState("");

  const fetchTweet = async () => {
    if (!tweetUrl.trim() || fetching) return;
    setFetching(true); setFetchError(""); setFetchedAuthor("");
    try {
      const res  = await fetch("/api/fetch-tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: tweetUrl }),
      });
      const data = await res.json();
      if (data.error) { setFetchError(data.error); }
      else { setPlatform("X（Twitter）"); setUrl(tweetUrl); setText(data.text); setFetchedAuthor(data.author); setResult(null); }
    } catch { setFetchError("取得中にエラーが発生しました"); }
    finally  { setFetching(false); }
  };

  const generate = async () => {
    if (!text.trim() || loading) return;
    setLoading(true); setResult(null); setGenError(null);
    try {
      const res  = await fetch("/api/analyze", {
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
      sendGA("report_generated", { platform });
    } catch (e) {
      setGenError(
        e instanceof Error && e.message
          ? e.message
          : "通報文の生成に失敗しました。しばらく待ってから再度お試しください。"
      );
    } finally {
      setLoading(false);
    }
  };

  const platforms = ["X（Twitter）", "Instagram", "TikTok", "LINE", "Telegram", "その他"];

  return (
    <section id="report" className="py-20 px-4 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase bg-red-50 text-red-600">
            機能② 市民通報ハブ
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">大元を直接通報する</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
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
              className="bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 shadow-sm rounded-xl p-4 transition-all block group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-slate-800 leading-tight pr-2 group-hover:text-slate-900">{t.name}</span>
                <span className={"text-xs font-bold px-2 py-0.5 rounded-md border flex-shrink-0 " + t.accent}>{t.tag}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-2">{t.desc}</p>
              <span className="text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                通報ページを開く →
              </span>
            </a>
          ))}
        </div>

        {/* 弁護士バナー */}
        <a
          href={A8_LAWYER_URL}
          target="_blank"
          rel="nofollow noopener noreferrer"
          onClick={() => sendGA("affiliate_click", { affiliate: "lawyer", position: "report_hub" })}
          className="flex items-center gap-4 bg-blue-600 hover:bg-blue-500 rounded-2xl p-5 mb-6 transition-all group"
        >
          <span className="text-3xl flex-shrink-0">👨‍⚖️</span>
          <div className="flex-1">
            <div className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">
              ヤミ金・恐喝・詐欺被害の専門家
            </div>
            <div className="text-base font-black text-white">【無料相談】今すぐ弁護士に相談する</div>
            <div className="text-xs text-blue-200 mt-1">
              通報と並行して法的手続きの準備を。相談料0円・秘密厳守
            </div>
          </div>
          <span className="text-white text-xl group-hover:translate-x-1 transition-transform flex-shrink-0">→</span>
        </a>

        {/* X URL自動取得 */}
        <div className="bg-white border border-blue-200 shadow-sm rounded-2xl overflow-hidden mb-4">
          <div className="p-5 border-b border-slate-100">
            <div className="font-bold text-slate-800 mb-1 text-sm">🔗 X(Twitter)投稿URLから自動取得</div>
            <div className="text-xs text-slate-500">
              怪しい投稿のURLを貼り付けるだけで、投稿内容を自動で読み込みます
            </div>
          </div>
          <div className="p-5">
            <div className="flex gap-2 mb-3">
              <input
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchTweet()}
                placeholder="https://x.com/xxx/status/123..."
                className="flex-1 bg-white border border-slate-200 focus:border-blue-400 rounded-xl p-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-all"
              />
              <button
                onClick={fetchTweet}
                disabled={!tweetUrl.trim() || fetching}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm whitespace-nowrap"
              >
                {fetching ? "取得中…" : "取得する"}
              </button>
            </div>
            {fetchError && <p className="text-xs text-red-400">{fetchError}</p>}
            {fetchedAuthor && !fetchError && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                <span>✓</span>
                <span>@{fetchedAuthor} の投稿を取得しました。下の通報文生成ボタンを押してください。</span>
              </div>
            )}
          </div>
        </div>

        {/* AI通報文生成 */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden mb-6">
          <div className="p-5 border-b border-slate-100">
            <div className="font-bold text-slate-800 mb-1 text-sm">🤖 AI通報文ジェネレーター</div>
            <div className="text-xs text-slate-500">
              投稿内容を貼り付けると、IHC・警察に提出できる通報文をAIが自動生成します
            </div>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div>
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                発見したプラットフォーム
              </div>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={"px-3 py-1.5 rounded-lg text-xs font-bold border transition-all " +
                      (platform === p
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-transparent text-slate-500 border-slate-200 hover:border-slate-400")}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                投稿URL（任意）
              </div>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://x.com/..."
                className="w-full bg-white border border-slate-200 focus:border-blue-400 rounded-xl p-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-all"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                投稿内容・DMテキスト（必須）
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="怪しいと感じた投稿・DMの内容をそのまま貼り付けてください"
                rows={5}
                className="w-full bg-white border border-slate-200 focus:border-blue-400 rounded-xl p-3 text-sm text-slate-800 leading-relaxed resize-none outline-none placeholder:text-slate-400 transition-all"
              />
            </div>
            <button
              onClick={generate}
              disabled={!text.trim() || loading}
              className="bg-red-500 hover:bg-red-400 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-3.5 rounded-xl transition-all text-sm"
            >
              {loading ? "通報文を生成中..." : "通報文をAIで自動生成する →"}
            </button>
            {genError && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600 flex items-start gap-2">
                <span className="flex-shrink-0 mt-0.5">⚠️</span>
                <span>{genError}</span>
              </div>
            )}
          </div>
        </div>

        {result && (
          <div className="flex flex-col gap-4">
            <div className={"rounded-xl p-4 border flex gap-3 items-start " +
              (result.is_illegal
                ? "bg-red-500/10 border-red-500/30"
                : "bg-emerald-500/10 border-emerald-500/30")}>
              <span className="text-2xl">{result.is_illegal ? "🚨" : "ℹ️"}</span>
              <div>
                <div className={"font-bold mb-1 text-sm " +
                  (result.is_illegal ? "text-red-400" : "text-emerald-400")}>
                  {result.is_illegal
                    ? "違法情報の可能性あり — 通報を強く推奨します"
                    : "違法性は低めですが、念のため通報可能です"}
                </div>
                <div className="text-xs text-slate-400">
                  カテゴリ：{result.category}　緊急度：{result.urgency}
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
                📋 通報前に確認すること
              </div>
              {result.evidence_checklist?.map((item, i) => (
                <div key={i} className="flex gap-2 mb-2 text-sm text-slate-700">
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
                <div className="text-xs text-slate-400">
                  あなたの行動が闇バイト組織の摘発に貢献します。
                </div>
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
