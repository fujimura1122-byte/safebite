"use client";
import { sendGA } from "./tracking";
import { SHARE_URL, SHARE_TEXT } from "./constants";

export function ShareButtons({ compact = false }: { compact?: boolean }) {
  const xUrl =
    "https://x.com/intent/tweet?text=" +
    encodeURIComponent(SHARE_TEXT) +
    "&url=" +
    encodeURIComponent(SHARE_URL);
  const lineUrl =
    "https://social-plugins.line.me/lineit/share?url=" +
    encodeURIComponent(SHARE_URL) +
    "&text=" +
    encodeURIComponent(SHARE_TEXT);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sendGA("share", { method: "x", position: "nav" })}
          className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs transition-all"
        >
          𝕏 シェア
        </a>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sendGA("share", { method: "line", position: "nav" })}
          className="flex items-center gap-1.5 bg-[#06C755]/15 hover:bg-[#06C755]/25 border border-[#06C755]/30 text-[#06C755] font-bold px-3 py-1.5 rounded-lg text-xs transition-all"
        >
          LINE
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-bold text-slate-300">
        身近な人に教えてください — あなたのシェアが1人を救うかもしれません
      </p>
      <div className="flex gap-3 flex-wrap">
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sendGA("share", { method: "x", position: "footer" })}
          className="flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-black px-5 py-3 rounded-xl text-sm transition-all"
        >
          𝕏 Xでシェアする
        </a>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sendGA("share", { method: "line", position: "footer" })}
          className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34b] text-white font-black px-5 py-3 rounded-xl text-sm transition-all"
        >
          <span className="text-base leading-none">💬</span>
          LINEで友達に教える
        </a>
      </div>
    </div>
  );
}
