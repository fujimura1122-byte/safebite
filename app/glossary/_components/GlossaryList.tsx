"use client";

import Link from "next/link";
import { useState } from "react";
import { terms, dangerConfig, categoryConfig } from "../terms";

type CategoryFilter = 0 | 1 | 2 | 3;

// 危険度の表示優先順（extreme が最上位）
const DANGER_ORDER = { extreme: 0, high: 1, caution: 2 } as const;

function sortedTerms(list: typeof terms) {
  return [...list].sort((a, b) => {
    // 1st: 危険度降順
    const d = DANGER_ORDER[a.danger] - DANGER_ORDER[b.danger];
    if (d !== 0) return d;
    // 2nd: カテゴリ昇順（1→2→3）
    return a.category - b.category;
  });
}

export function GlossaryList() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(0);

  const baseList = activeCategory === 0
    ? terms
    : terms.filter((t) => t.category === activeCategory);

  const filtered = sortedTerms(baseList);

  const counts = {
    0: terms.length,
    1: terms.filter((t) => t.category === 1).length,
    2: terms.filter((t) => t.category === 2).length,
    3: terms.filter((t) => t.category === 3).length,
  };

  return (
    <>
      {/* カテゴリタブ */}
      <div className="flex flex-wrap gap-2 mb-6">
        {([
          { id: 0 as CategoryFilter, label: `すべて（${counts[0]}語）`,        activeBg: "bg-slate-800",   activeText: "text-white", inactiveBg: "bg-slate-100",   inactiveText: "text-slate-700" },
          { id: 1 as CategoryFilter, label: `募集フレーズ（${counts[1]}語）`,  activeBg: "bg-orange-600",  activeText: "text-white", inactiveBg: "bg-orange-50",   inactiveText: "text-orange-700" },
          { id: 2 as CategoryFilter, label: `役割の隠語（${counts[2]}語）`,    activeBg: "bg-red-600",     activeText: "text-white", inactiveBg: "bg-red-50",      inactiveText: "text-red-700" },
          { id: 3 as CategoryFilter, label: `手口・ツール（${counts[3]}語）`,  activeBg: "bg-blue-600",    activeText: "text-white", inactiveBg: "bg-blue-50",     inactiveText: "text-blue-700" },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
              activeCategory === tab.id
                ? `${tab.activeBg} ${tab.activeText} shadow-sm`
                : `${tab.inactiveBg} ${tab.inactiveText} hover:opacity-80`
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 用語カード一覧 */}
      <div className="flex flex-col gap-3 mb-12">
        {filtered.map((t) => {
          const d = dangerConfig[t.danger];
          const c = categoryConfig[t.category];
          return (
            <Link
              key={t.slug}
              href={"/glossary/" + t.slug}
              className="group border border-slate-100 hover:border-slate-200 hover:shadow-sm bg-white rounded-2xl p-5 flex items-start gap-4 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-base font-black text-slate-900 group-hover:text-red-600 transition-colors">
                    {t.word}
                  </h2>
                  <span className="text-xs text-slate-400">（{t.read}）</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${d.cls}`}>
                    {d.label}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${c.color} ${c.bg} ${c.border}`}>
                    {c.label}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{t.short}</p>
              </div>
              <span className="text-slate-300 group-hover:text-slate-500 transition-colors text-sm mt-1 flex-shrink-0">→</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
