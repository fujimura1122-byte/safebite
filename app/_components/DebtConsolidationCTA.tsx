"use client";
import { sendGA } from "./tracking";
import { A8_SAIMUSEIRI_URL } from "./constants";

// 債務整理の無料相談窓口（民間・アフィリエイト）。
// 公的窓口（法テラス）を先に案内した上での「もう一つの選択肢」として提示する。
// ステマ規制対応のため必ず「PR」表記を出す。
export default function DebtConsolidationCTA({ position }: { position: string }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">
          もう一つの選択肢
        </span>
        <span className="text-[10px] font-bold text-emerald-600/70 border border-emerald-300 rounded px-1.5 py-0.5">
          PR
        </span>
      </div>
      <a
        href={A8_SAIMUSEIRI_URL}
        target="_blank"
        rel="nofollow noopener noreferrer sponsored"
        onClick={() => sendGA("affiliate_click", { affiliate: "saimuseiri", position })}
        className="flex items-center gap-4 px-4 py-4 hover:bg-emerald-100 transition-all group"
      >
        <span className="text-3xl flex-shrink-0">📉</span>
        <div className="flex-1">
          <div className="text-sm font-black text-emerald-900 group-hover:text-emerald-700 transition-colors mb-1">
            借金がいくら減るか、無料でチェックする →
          </div>
          <p className="text-xs text-emerald-700/80 leading-relaxed">
            弁護士・司法書士による無料の借金減額診断。匿名・スマホだけで、いくら減額できるか目安がわかります。取り立ても止められます。
          </p>
        </div>
      </a>
    </div>
  );
}
