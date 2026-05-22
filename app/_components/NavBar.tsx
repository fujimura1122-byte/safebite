"use client";
import { ShareButtons } from "./ShareButtons";

export default function NavBar() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="font-black text-lg tracking-tight">
          <span className="text-red-500">Safe</span>
          <span className="text-white">Bite</span>
        </div>
        <div className="flex items-center gap-0.5 text-xs font-bold flex-wrap justify-end">
          {[
            { id: "checker", label: "危険度チェック" },
            { id: "report",  label: "通報ハブ" },
            { id: "sos",     label: "SOS" },
            { id: "jobs",    label: "安全な求人" },
          ].map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {n.label}
            </button>
          ))}
          <a
            href="/glossary"
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            隠語辞典
          </a>
          <a
            href="/guide/kotowarikata"
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            ガイド
          </a>
          <div className="ml-2 hidden sm:flex">
            <ShareButtons compact />
          </div>
        </div>
      </div>
    </nav>
  );
}
