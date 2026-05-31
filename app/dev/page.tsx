import { TASKS, PRIORITY_LABELS, STATUS_CONFIG, type Priority } from "./tasks";
import { terms } from "../glossary/terms";
import { auth, signOut } from "@/auth";
import MonitorSection from "./_components/MonitorSection";
import EmailSection   from "./_components/EmailSection";

export const metadata = { title: "Dev Dashboard | SafeBite", robots: "noindex,nofollow" };

const PRIORITIES: Priority[] = ["P1", "P2", "P3", "P4", "P5"];

const QUICK_LINKS = [
  { label: "Vercel",            url: "https://vercel.com/dashboard",                      icon: "▲" },
  { label: "Google SC",         url: "https://search.google.com/search-console",           icon: "🔍" },
  { label: "X プロフィール",    url: "https://x.com/SafeBiteJP",                           icon: "𝕏" },
  { label: "saferbite.org",     url: "https://saferbite.org",                              icon: "🌐" },
  { label: "A8 管理画面",       url: "https://pub.a8.net/a8v2/asPublisherTop.do",          icon: "💴" },
  { label: "GitHub",            url: "https://github.com",                                 icon: "🐙" },
];

const SYSTEM_STATUS = [
  {
    title: "自動投稿",
    icon: "📡",
    items: [
      { label: "スケジューラー", value: "⛔ 停止中（X凍結対応）" },
      { label: "X アカウント",   value: "🔴 凍結中 @bite_safe" },
      { label: "異議申し立て",   value: "⏳ 申請済み・返答待ち" },
      { label: "TikTok",        value: "✅ @safebite_jp 2/10本" },
    ],
    status: "warn" as const,
  },
  {
    title: "サイト",
    icon: "🌐",
    items: [
      { label: "デプロイ先", value: "Vercel ✅" },
      { label: "用語集",     value: `${terms.length}語` },
      { label: "メール受信", value: "✅ 稼働中" },
      { label: "GA4",        value: "✅ キーイベント設定済" },
    ],
    status: "ok" as const,
  },
  {
    title: "API / セキュリティ",
    icon: "🔒",
    items: [
      { label: "AI チェッカー",   value: "✅ 稼働中" },
      { label: "レートリミット",  value: "✅ Redis 設定済" },
      { label: "メール認証",      value: "✅ Bearer Token" },
      { label: "Email Worker",   value: "✅ Cloudflare 稼働中" },
    ],
    status: "ok" as const,
  },
];

export default async function DevDashboard() {
  const session = await auth();
  const done  = TASKS.filter((t) => t.status === "done").length;
  const total = TASKS.length;
  const pct   = Math.round((done / total) * 100);

  const byPriority = PRIORITIES.map((p) => ({
    priority: p,
    tasks: TASKS.filter((t) => t.priority === p),
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono">
      {/* ヘッダー */}
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-black">
            <span className="text-red-500">Safe</span>
            <span className="text-white">Bite</span>
          </span>
          <span className="text-slate-500 text-xs">Dev Dashboard</span>
          <span className="bg-red-900 text-red-300 text-xs px-2 py-0.5 rounded font-bold">PRIVATE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-xs hidden sm:block">
            {session?.user?.email}
          </span>
          <span className="text-slate-600 text-xs">
            {new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })}
          </span>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/dev/login" }); }}>
            <button type="submit" className="text-xs text-slate-500 hover:text-red-400 transition-colors px-2 py-1 rounded border border-slate-800 hover:border-red-800">
              ログアウト
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">

        {/* 進捗サマリー */}
        <section>
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Overall Progress</h2>
            <span className="text-slate-300 text-sm font-bold">{done} / {total} 完了 ({pct}%)</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          {/* 優先度別カウント */}
          <div className="grid grid-cols-5 gap-2 mt-3">
            {byPriority.map(({ priority, tasks }) => {
              const p = PRIORITY_LABELS[priority];
              const d = tasks.filter((t) => t.status === "done").length;
              return (
                <div key={priority} className={`rounded-lg p-2 border text-center ${p.bg} ${p.border}`}>
                  <div className={`text-xs font-bold ${p.color}`}>{p.label}</div>
                  <div className={`text-lg font-black ${p.color}`}>{d}/{tasks.length}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* システムステータス */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SYSTEM_STATUS.map((sys) => (
              <div key={sys.title}
                className={`rounded-xl border p-4 ${
                  sys.status === "ok"
                    ? "bg-green-950 border-green-800"
                    : "bg-yellow-950 border-yellow-800"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span>{sys.icon}</span>
                  <span className="font-bold text-sm">{sys.title}</span>
                  <span className={`ml-auto text-xs font-bold ${
                    sys.status === "ok" ? "text-green-400" : "text-yellow-400"
                  }`}>
                    {sys.status === "ok" ? "● OK" : "● WARN"}
                  </span>
                </div>
                <div className="space-y-1">
                  {sys.items.map((item) => (
                    <div key={item.label} className="flex justify-between text-xs">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-slate-200 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* タスクボード */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Task Board</h2>
          <div className="space-y-6">
            {byPriority.map(({ priority, tasks }) => {
              const p = PRIORITY_LABELS[priority];
              const doneCount = tasks.filter((t) => t.status === "done").length;
              const pctP = Math.round((doneCount / tasks.length) * 100);
              return (
                <div key={priority} className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                  {/* グループヘッダー */}
                  <div className={`px-4 py-2.5 flex items-center justify-between border-b border-slate-800 ${p.bg.replace("bg-", "bg-opacity-10 bg-")}`}>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black px-2 py-0.5 rounded border ${p.color} ${p.bg} ${p.border}`}>
                        {p.label}
                      </span>
                      <span className="text-slate-400 text-xs">{doneCount}/{tasks.length}</span>
                    </div>
                    <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: `${pctP}%` }} />
                    </div>
                  </div>
                  {/* タスク一覧 */}
                  <div className="divide-y divide-slate-800">
                    {tasks.map((task) => {
                      const s = STATUS_CONFIG[task.status];
                      return (
                        <div key={task.id}
                          className={`px-4 py-3 flex gap-3 ${
                            task.status === "done" ? "opacity-50" : ""
                          }`}
                        >
                          <span className="text-base flex-shrink-0 mt-0.5">{s.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 flex-wrap">
                              <span className={`text-sm font-bold ${
                                task.status === "done" ? "line-through text-slate-500" : "text-slate-100"
                              }`}>
                                {task.title}
                              </span>
                              {task.completedAt && (
                                <span className="text-xs text-slate-600 ml-auto flex-shrink-0">{task.completedAt}</span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{task.detail}</p>
                            {task.blockedBy && (
                              <span className="inline-block mt-1 text-xs text-orange-400 bg-orange-950 border border-orange-900 px-2 py-0.5 rounded">
                                🚧 {task.blockedBy}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* メール受信箱 */}
        <EmailSection />

        {/* 監視パネル */}
        <MonitorSection />

        {/* ロードマップ */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Roadmap</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 font-mono text-xs text-slate-400 leading-loose">
            <pre>{`今週   TikTok残り8本投稿 → X凍結の異議申し立て返答待ち
今月   TikTok10本完成 → Instagram開設（リール流用）
来月   PR Times プレスリリース → A8アフィリエイト最適化
2ヶ月  警察庁リンク集申請 → LINE OpenChat開設
3ヶ月  TikTok自動化 → OSINT脅威DB（法務確認後）`}</pre>
          </div>
        </section>

        {/* クイックリンク */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Links</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {QUICK_LINKS.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl p-3 text-center transition-all group"
              >
                <div className="text-xl mb-1">{link.icon}</div>
                <div className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors font-sans">
                  {link.label}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* フッター */}
        <footer className="text-center text-xs text-slate-700 pb-4">
          SafeBite Dev Dashboard — このページは外部に公開しないでください
        </footer>
      </div>
    </div>
  );
}
