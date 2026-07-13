"use client";
import { sendGA } from "./tracking";

// 公的相談窓口（法テラス）への非アフィリエイト導線。
// 「詐欺事件を成果報酬で弁護士紹介」は弁護士法13条/72条の懲戒事例に該当するため、
// 刑事系のアフィリエイトリンクは設置しない（公益サイトのリスク回避）。
// 収益化する場合は、ミッションと整合する「債務整理」案件を別途 /guide/shakkin-deguchi に設置する。
export default function LawyerCTA({ position }: { position: string }) {
  return (
    <a
      href="https://www.houterasu.or.jp/"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => sendGA("public_resource_click", { resource: "houterasu", position })}
      className="flex items-center gap-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-2xl p-5 transition-all group"
    >
      <span className="text-3xl flex-shrink-0">⚖️</span>
      <div className="flex-1">
        <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">
          電話しづらい方へ
        </div>
        <div className="text-sm font-black text-indigo-900 group-hover:text-indigo-700 transition-colors mb-1">
          法テラスで無料の法律相談を予約する（公的機関）→
        </div>
        <p className="text-xs text-indigo-700/70 leading-relaxed">
          「自分も罪に問われるのか」「自首すべきか」——法テラス（日本司法支援センター）は国が設立した公的機関で、収入が少ない方は無料で弁護士に相談できます。オンライン・電話でも予約可能です。
        </p>
      </div>
    </a>
  );
}
