"use client";
import Link from "next/link";

export default function HeroSubActions() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* コピペ不要の診断への導線（求人文を持っていない訪問者向け） */}
      <Link
        href="/shindan"
        className="flex items-center justify-center gap-2 mb-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 font-bold py-3 rounded-2xl text-sm transition-all"
      >
        <span>📋</span>
        求人文がなくてもOK — 5つの質問で危険度セルフ診断
        <span className="text-slate-500">→</span>
      </Link>

      <div className="flex gap-4 justify-center mb-8 text-sm font-bold">
        <button
          onClick={() => scrollTo("sos")}
          className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5"
        >
          🆘 今すぐ逃げたい
        </button>
        <span className="text-slate-700">|</span>
        <button
          onClick={() => scrollTo("jobs")}
          className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5"
        >
          💼 安全なバイトを探す
        </button>
      </div>
    </>
  );
}
