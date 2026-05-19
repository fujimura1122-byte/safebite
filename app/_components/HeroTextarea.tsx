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
          "border rounded-2xl overflow-hidden mb-3 transition-all " +
          (text ? "border-red-500/30 ring-1 ring-red-500/20" : "border-blue-500/20")
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
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-100 disabled:text-slate-400 text-white font-black py-4 rounded-2xl text-base transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mb-5"
      >
        <span className="text-xl">🔍</span>
        今すぐ危険度を判定する →
      </button>
    </>
  );
}
