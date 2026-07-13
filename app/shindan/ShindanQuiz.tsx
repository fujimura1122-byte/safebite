"use client";
import { useState } from "react";
import Link from "next/link";
import { sendGA } from "../_components/tracking";

type Q = { id: string; text: string; hint: string; weight: number; critical?: boolean };

const QUESTIONS: Q[] = [
  {
    id: "pay",
    text: "報酬が仕事内容に対して不自然に高い（日払い・即日で高額）",
    hint: "「1日3万円」「受け取るだけで高収入」など",
    weight: 20,
  },
  {
    id: "chat",
    text: "応募や連絡が LINE・Telegram・匿名DM で行われる",
    hint: "公式サイトや会社の連絡先がなくチャットで完結する",
    weight: 15,
  },
  {
    id: "goods",
    text: "「荷物の受け取り・転送」「銀行口座・SIMの貸与」が含まれる",
    hint: "受け子・口座買取など、これ自体が犯罪の可能性",
    weight: 40,
    critical: true,
  },
  {
    id: "id",
    text: "早い段階で身分証の写真・自宅住所を求められた",
    hint: "脅迫の材料にされたり、名義を悪用される",
    weight: 15,
  },
  {
    id: "vague",
    text: "会社名・所在地・具体的な仕事内容が説明されない",
    hint: "「詳細は後で」「やればわかる」で濁される",
    weight: 10,
  },
];

type Verdict = { label: string; color: string; bar: string; badge: string; advice: string };

function judge(score: number, criticalHit: boolean): Verdict {
  if (criticalHit || score >= 60) {
    return {
      label: "危険 — 応募しないでください",
      color: "text-red-500",
      bar: "bg-red-500",
      badge: "bg-red-500/10 text-red-400 border-red-500/20",
      advice:
        "闇バイトの可能性が非常に高いです。絶対に応募・返信せず、すぐに連絡を断ってください。すでに個人情報を渡した場合は警察安全相談電話（#9110）へ。",
    };
  }
  if (score >= 30) {
    return {
      label: "要注意 — 鵜呑みにしないで",
      color: "text-amber-400",
      bar: "bg-amber-500",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      advice:
        "怪しい要素があります。会社名・所在地・雇用条件を必ず確認し、少しでも不安があれば応募を見送ってください。求人文をAIチェッカーにかけて確認するのがおすすめです。",
    };
  }
  return {
    label: "現時点では低め",
    color: "text-emerald-400",
    bar: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    advice:
      "今回の回答では危険度は低めですが、油断は禁物です。実際の求人文・DMをAIチェッカーで確認し、前払いや荷物受け取りが出てきたら即中止してください。",
  };
}

export default function ShindanQuiz() {
  const [answers, setAnswers] = useState<Record<string, boolean | undefined>>({});
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  const setAnswer = (id: string, val: boolean) => {
    if (!started) {
      setStarted(true);
      sendGA("shindan_started", {});
    }
    setAnswers((a) => ({ ...a, [id]: val }));
  };

  const answeredCount = QUESTIONS.filter((q) => answers[q.id] !== undefined).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  const score = QUESTIONS.reduce((s, q) => s + (answers[q.id] ? q.weight : 0), 0);
  const criticalHit = QUESTIONS.some((q) => q.critical && answers[q.id]);
  const displayScore = criticalHit ? Math.max(score, 75) : score;
  const verdict = judge(score, criticalHit);

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    sendGA("shindan_completed", { score: displayScore, verdict: verdict.label });
    setTimeout(() => document.getElementById("shindan-result")?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const shareText = encodeURIComponent(
    "闇バイト危険度セルフ診断をやってみた。あなたのバイトは本当に大丈夫？5つの質問で今すぐチェック👇"
  );
  const shareUrl = "https://saferbite.org/shindan";

  return (
    <div>
      {/* 質問 */}
      <div className="flex flex-col gap-4 mb-8">
        {QUESTIONS.map((q, i) => {
          const val = answers[q.id];
          return (
            <div
              key={q.id}
              className={
                "rounded-2xl border p-5 transition-all " +
                (val === true
                  ? "border-red-500/40 bg-red-500/5"
                  : val === false
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-white/10 bg-white/5")
              }
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-xs font-black text-slate-500 bg-white/10 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-white leading-snug">{q.text}</p>
                  <p className="text-xs text-slate-500 mt-1">{q.hint}</p>
                </div>
              </div>
              <div className="flex gap-3 pl-9">
                <button
                  onClick={() => setAnswer(q.id, true)}
                  className={
                    "flex-1 py-2.5 rounded-xl text-sm font-bold transition-all border " +
                    (val === true
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-transparent text-slate-300 border-white/15 hover:border-red-400/50")
                  }
                >
                  はい
                </button>
                <button
                  onClick={() => setAnswer(q.id, false)}
                  className={
                    "flex-1 py-2.5 rounded-xl text-sm font-bold transition-all border " +
                    (val === false
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-transparent text-slate-300 border-white/15 hover:border-emerald-400/50")
                  }
                >
                  いいえ
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 診断ボタン */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full bg-red-600 hover:bg-red-500 disabled:bg-white/5 disabled:text-slate-600 text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-red-900/30"
        >
          {allAnswered ? "診断結果を見る →" : `あと ${QUESTIONS.length - answeredCount} 問（すべて答えてください）`}
        </button>
      )}

      {/* 結果 */}
      {submitted && (
        <div id="shindan-result" className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-3xl font-black ${verdict.color}`}>
              {displayScore}
              <span className="text-base font-bold text-slate-500">/100</span>
            </span>
            <span className={`text-xs font-black px-3 py-1.5 rounded-full border ${verdict.badge}`}>
              {verdict.label}
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2.5 mb-5">
            <div className={`h-2.5 rounded-full ${verdict.bar} transition-all`} style={{ width: `${displayScore}%` }} />
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-5">{verdict.advice}</p>

          {/* 次のアクション */}
          <div className="flex flex-col gap-3 mb-5">
            <Link
              href="/#checker"
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl text-sm transition-all"
            >
              🔍 実際の求人文をAIでチェックする →
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sendGA("share", { method: "x", position: "shindan" })}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-white/10 text-white font-bold py-3 rounded-xl text-sm transition-all"
              >
                <span className="font-black">𝕏</span> シェア
              </a>
              <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sendGA("share", { method: "line", position: "shindan" })}
                className="flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-3 rounded-xl text-sm transition-all"
              >
                LINE
              </a>
            </div>
          </div>

          {/* 関連リンク */}
          <div className="border-t border-white/10 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">もっと詳しく知る</p>
            <div className="flex flex-col gap-2">
              {[
                { href: "/guide/fukugyo-sagi", label: "副業詐欺の手口と見分け方" },
                { href: "/guide/taiho-jirei", label: "闇バイト逮捕・判決事例まとめ" },
                { href: "/glossary", label: "闇バイト隠語辞典 100語" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <span className="text-red-400 text-xs">▶</span>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={reset}
            className="w-full mt-5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            もう一度診断する
          </button>
        </div>
      )}
    </div>
  );
}
