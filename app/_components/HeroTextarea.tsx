"use client";
import { useState } from "react";

export default function HeroTextarea() {
  const [text, setText] = useState("");

  const handleCheck = () => {
    if (!text.trim()) return;
    // CheckerSection へカスタムイベントで渡す
    window.dispatchEvent(new CustomEvent("safebite:check", { detail: { text } }));
    setTimeout(() => {
      document.getElementById("checker")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <>
      <div
        className={
          "rounded-2xl overflow-hidden mb-3 transition-all " +
          (text
            ? "ring-2 ring-red-500/40 border border-red-500/30"
            : "border border-white/10")
        }
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={"例）「高収入日払い！誰でもOK、Telegram誘導。身バレなし。1日5万保証」\n\n↑このようなテキストをここに貼り付け"}
          rows={4}
          className="w-full p-4 text-slate-800 text-sm leading-relaxed resize-none outline-none bg-white placeholder:text-slate-400"
        />
      </div>
      <button
        onClick={handleCheck}
        disabled={!text.trim()}
        className="w-full bg-red-600 hover:bg-red-500 disabled:bg-white/5 disabled:text-slate-600 text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 mb-5"
      >
        <span className="text-xl">🔍</span>
        今すぐ危険度を判定する →
      </button>
    </>
  );
}
