"use client";
import { ShareButtons } from "./ShareButtons";

export default function NavBar() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="font-black text-lg tracking-tight">
          <span className="text-blue-600">Safe</span>
          <span className="text-slate-900">Bite</span>
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
              className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              {n.label}
            </button>
          ))}
          <a
            href="/glossary"
            className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            隠語辞典
          </a>
          <div className="ml-2 hidden sm:flex">
            <ShareButtons compact />
          </div>
        </div>
      </div>
    </nav>
  );
}
