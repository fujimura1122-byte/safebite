"use client";
import { useState } from "react";
import { sendGA, incCounter } from "./tracking";
import { A8_NORTON_URL } from "./constants";

type Result = {
  score: number;
  verdict: string;
  reasons: string[];
  keywords: string[];
  advice: string;
  should_report: boolean;
};

const scoreLabel = (score: number) =>
  score >= 70 ? "危険" : score >= 40 ? "要注意" : "安全";

const scoreColor = (score: number) =>
  score >= 70
    ? { ring: "ring-red-500/40", text: "text-red-500", bar: "bg-red-500", badge: "bg-red-500/10 text-red-400 border-red-500/20" }
    : score >= 40
    ? { ring: "ring-amber-500/40", text: "text-amber-400", bar: "bg-amber-500", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" }
    : { ring: "ring-emerald-500/40", text: "text-emerald-400", bar: "bg-emerald-500", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };

export default function HeroTextarea() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    sendGA("checker_started", { text_length: text.length });
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type: "analyze" }),
      });
      if (res.status === 429) {
        setError("リクエストが多すぎます。1分後に再試行してください。");
        return;
      }
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
      incCounter("ai_checks");
      sendGA("ai_check", { score: data.score, verdict: data.verdict });
      // 他セクション（CheckerSection）にも同期
      window.dispatchEvent(new CustomEvent("safebite:check", { detail: { text } }));
    } catch {
      setError("分析中にエラーが発生しました。再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const c = result ? scoreColor(result.score) : null;

  return (
    <>
      {/* Textarea */}
      <div
        className={
          "rounded-2xl overflow-hidden mb-3 transition-all " +
          (result && c
            ? `ring-2 ${c.ring} border border-white/10`
            : text
            ? "ring-2 ring-red-500/40 border border-red-500/30"
            : "border border-white/10")
        }
      >
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setResult(null); setError(null); }}
          placeholder={"例）「高収入日払い！誰でもOK、Telegram誘導。身バレなし。1日5万保証」\n\n↑このようなテキストをここに貼り付け"}
          rows={4}
          className="w-full p-4 text-slate-800 text-sm leading-relaxed resize-none outline-none bg-white placeholder:text-slate-400"
        />
      </div>

      {/* ボタン */}
      <button
        onClick={handleCheck}
        disabled={!text.trim() || loading}
        className="w-full bg-red-600 hover:bg-red-500 disabled:bg-white/5 disabled:text-slate-600 text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 mb-5"
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            AIが分析中…
          </>
        ) : (
          <>
            <span className="text-xl">🔍</span>
            今すぐ危険度を判定する →
          </>
        )}
      </button>

      {/* エラー */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* 結果（ヒーロー内に表示） */}
      {result && c && (
        <div className={`rounded-2xl border ${c.badge.split(" ").find(s => s.startsWith("border")) ?? "border-white/10"} bg-white/5 p-5 mb-5 text-left`}>
          {/* スコアバー */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-2xl font-black ${c.text}`}>{result.score}<span className="text-base font-bold text-slate-400">/100</span></span>
            <span className={`text-xs font-black px-3 py-1.5 rounded-full border ${c.badge}`}>
              {scoreLabel(result.score)} — {result.verdict}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mb-4">
            <div
              className={`h-2 rounded-full ${c.bar} transition-all`}
              style={{ width: `${result.score}%` }}
            />
          </div>

          {/* 判断理由 */}
          {result.reasons.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">判断理由</p>
              <ul className="flex flex-col gap-1">
                {result.reasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-slate-500 flex-shrink-0 mt-0.5">•</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* アドバイス */}
          {result.advice && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-3">
              <p className="text-xs text-slate-300 leading-relaxed">{result.advice}</p>
            </div>
          )}

          {/* キーワード */}
          {result.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {result.keywords.map((k) => (
                <span key={k} className="text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-md">
                  {k}
                </span>
              ))}
            </div>
          )}

          {/* score 70以上：スマホ保護（アフィリエイト） */}
          {result.score >= 70 && (
            <a
              href={A8_NORTON_URL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              onClick={() => sendGA("affiliate_click", { affiliate: "norton", position: "hero_result" })}
              className="flex items-center gap-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 mb-3 transition-all group text-left"
            >
              <span className="text-2xl flex-shrink-0">🛡️</span>
              <div className="flex-1">
                <div className="text-xs font-bold text-amber-500 mb-0.5">情報漏えいを防ぐために</div>
                <div className="text-sm font-bold text-amber-400 group-hover:text-amber-300">
                  スマホ・PCをウイルスから今すぐ守る（ノートン公式）→
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  闇バイト関与中はマルウェア感染リスクが高まります
                </div>
              </div>
            </a>
          )}

          {/* 通報リンク */}
          {result.should_report && (
            <a
              href="#report"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("report")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full mt-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all"
            >
              🚨 この求人を通報する →
            </a>
          )}
        </div>
      )}
    </>
  );
}
