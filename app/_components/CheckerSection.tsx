"use client";
import { useState, useEffect } from "react";
import { sendGA, incCounter } from "./tracking";
import { YAMI_KEYWORDS, SHARE_URL, A8_NORTON_URL } from "./constants";
import SectionTitle from "./SectionTitle";

type Result = {
  score: number; verdict: string; reasons: string[];
  keywords: string[]; advice: string; should_report: boolean;
};

const colorMap: Record<string, { ring: string; text: string; bg: string; badge: string; border: string }> = {
  red:    { ring: "ring-red-500/30",    text: "text-red-500",    bg: "bg-red-500/5",    badge: "bg-red-500/10 text-red-400",    border: "border-red-500/20"    },
  amber:  { ring: "ring-amber-500/30",  text: "text-amber-500",  bg: "bg-amber-500/5",  badge: "bg-amber-500/10 text-amber-400",  border: "border-amber-500/20"  },
  emerald:{ ring: "ring-emerald-500/30",text: "text-emerald-500",bg: "bg-emerald-500/5",badge: "bg-emerald-500/10 text-emerald-400",border:"border-emerald-500/20"},
  slate:  { ring: "ring-slate-200",     text: "text-slate-500",  bg: "bg-slate-50",     badge: "bg-slate-100 text-slate-500",     border: "border-slate-200"     },
};

const keywordRegex = new RegExp(
  "(" + YAMI_KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")",
  "gi",
);

export default function CheckerSection() {
  const [text, setText]     = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<Result | null>(null);
  const [error, setError]     = useState<string | null>(null);

  // ヒーロー textarea からのカスタムイベントを受信
  useEffect(() => {
    const handler = (e: Event) => {
      const { text: incoming } = (e as CustomEvent<{ text: string }>).detail;
      setText(incoming);
      analyzeText(incoming);
    };
    window.addEventListener("safebite:check", handler);
    return () => window.removeEventListener("safebite:check", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const analyzeText = async (target: string) => {
    if (!target.trim() || loading) return;
    setLoading(true); setError(null); setResult(null);
    sendGA("checker_started", { text_length: target.length });
    try {
      const res  = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: target, type: "analyze" }),
      });
      if (res.status === 429) { setError("リクエストが多すぎます。1分後に再試行してください。"); return; }
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
      incCounter("ai_checks");
      sendGA("ai_check", { score: data.score, verdict: data.verdict });
    } catch {
      setError("分析中にエラーが発生しました。再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = !result ? "slate" : result.score >= 70 ? "red" : result.score >= 40 ? "amber" : "emerald";
  const c = colorMap[scoreColor];

  const highlighted = text
    ? text.split(keywordRegex).map((part, i) =>
        YAMI_KEYWORDS.some((k) => k.toLowerCase() === part.toLowerCase())
          ? <mark key={i} className="bg-red-500/15 text-red-400 rounded px-0.5 font-bold not-italic">{part}</mark>
          : <span key={i}>{part}</span>
      )
    : null;

  return (
    <section id="checker" className="py-24 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <SectionTitle
          label="AI危険度チェッカー — FEATURE 01"
          title={<>求人文を貼るだけで<br />瞬時判定</>}
          subtitle="SNSのDM・投稿文をそのまま貼り付けてください。AIが闇バイトの特徴を即座に解析します。"
          dark={false}
          accent="red"
        />

        <div className={"border rounded-2xl overflow-hidden mb-4 transition-all " +
          (text ? "border-blue-400 ring-2 ring-blue-100" : "border-slate-200")}>
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
            onClick={() => analyzeText(text)}
            disabled={!text.trim() || loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm"
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

            {result.keywords?.length > 0 && (
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

              {/* 判定結果 X シェアボタン */}
              <a
                href={
                  "https://x.com/intent/tweet?text=" +
                  encodeURIComponent(
                    `SafeBiteのAIで求人をチェックしたら危険度【${result.score}/100】と判定されました。\n「${result.verdict}」\n\nそのバイト、応募する前に必ずチェックを👇`
                  ) +
                  "&url=" + encodeURIComponent(SHARE_URL)
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sendGA("share", { method: "x", position: "checker_result", score: result.score })}
                className="mt-3 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all text-sm"
              >
                <span className="font-black">𝕏</span>
                この判定結果をシェアして周囲に知らせる
              </a>

              {/* score 70以上：スマホ保護 */}
              {result.score >= 70 && (
                <a
                  href={A8_NORTON_URL}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  onClick={() => sendGA("affiliate_click", { affiliate: "norton", position: "checker_result" })}
                  className="mt-3 flex items-center gap-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl p-4 transition-all group"
                >
                  <span className="text-2xl flex-shrink-0">🛡️</span>
                  <div className="flex-1 text-left">
                    <div className="text-xs font-bold text-amber-800 mb-0.5">情報漏えいを防ぐために</div>
                    <div className="text-sm font-bold text-amber-900 group-hover:text-amber-700">
                      スマホ・PCをウイルスから今すぐ守る（ノートン公式）→
                    </div>
                    <div className="text-xs text-amber-600 mt-0.5">
                      闇バイト関与中はマルウェア感染リスクが高まります
                    </div>
                  </div>
                </a>
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
