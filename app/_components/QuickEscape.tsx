"use client";

export default function QuickEscape() {
  return (
    <button
      onClick={() => { window.location.href = "https://weather.yahoo.co.jp/weather/"; }}
      aria-label="画面を今すぐ隠す"
      className="fixed bottom-5 right-5 z-50 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-3 rounded-xl shadow-lg transition-all flex flex-col items-center gap-1"
    >
      <span className="text-base leading-none">👁</span>
      <span className="text-[10px] tracking-wide">今すぐ隠す</span>
    </button>
  );
}
