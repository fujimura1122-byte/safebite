"use client";

export default function HeroSubActions() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="flex gap-4 justify-center mb-8 text-sm font-bold">
      <button
        onClick={() => scrollTo("sos")}
        className="text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5"
      >
        🆘 今すぐ逃げたい
      </button>
      <span className="text-slate-300">|</span>
      <button
        onClick={() => scrollTo("jobs")}
        className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1.5"
      >
        💼 安全なバイトを探す
      </button>
    </div>
  );
}
