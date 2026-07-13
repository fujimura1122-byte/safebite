"use client";
import { sendGA } from "./tracking";
import { A8_LAWYER_URL } from "./constants";

// ガイドページ用 弁護士相談アフィリエイトCTA
// 公的窓口（法テラス等）の案内の後に「今すぐ・オンラインで」の選択肢として提示する
export default function LawyerCTA({ position }: { position: string }) {
  return (
    <a
      href={A8_LAWYER_URL}
      target="_blank"
      rel="nofollow noopener noreferrer"
      onClick={() => sendGA("affiliate_click", { affiliate: "lawyer", position })}
      className="flex items-center gap-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-2xl p-5 transition-all group"
    >
      <span className="text-3xl flex-shrink-0">⚖️</span>
      <div className="flex-1">
        <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">
          電話しづらい方へ
        </div>
        <div className="text-sm font-black text-indigo-900 group-hover:text-indigo-700 transition-colors mb-1">
          刑事事件に強い弁護士をオンラインで探す →
        </div>
        <p className="text-xs text-indigo-700/70 leading-relaxed">
          「自分も罪に問われるのか」「自首すべきか」——刑事事件の初回相談を受け付けている弁護士を今すぐ検索できます。
        </p>
      </div>
    </a>
  );
}
