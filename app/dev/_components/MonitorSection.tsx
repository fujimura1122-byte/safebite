"use client";

import { useState, useEffect, useCallback } from "react";

// ── 型定義 ──────────────────────────────────────────────────────────────────

type PostStatus = "未対応" | "通報済" | "誤報" | "グレー";

interface MonitorPost {
  id:         string;
  url:        string;
  author:     string;
  text:       string;
  category:   string;
  detectedAt: string;
  status:     PostStatus;
  reportRef?: string;
}

type Filter = "すべて" | PostStatus | "グレー";

// ── スタイル定数 ─────────────────────────────────────────────────────────────

const STATUS_CFG: Record<PostStatus, { label: string; dot: string; badge: string; btn: string }> = {
  未対応: {
    label: "未対応",
    dot:   "bg-yellow-400",
    badge: "bg-yellow-900/40 text-yellow-300 border border-yellow-700",
    btn:   "bg-yellow-900/60 text-yellow-300 border border-yellow-700 hover:bg-yellow-800",
  },
  通報済: {
    label: "通報済",
    dot:   "bg-green-400",
    badge: "bg-green-900/40 text-green-300 border border-green-700",
    btn:   "bg-green-900/60 text-green-300 border border-green-700 hover:bg-green-800",
  },
  誤報: {
    label: "誤報",
    dot:   "bg-slate-500",
    badge: "bg-slate-800 text-slate-400 border border-slate-600",
    btn:   "bg-slate-800 text-slate-400 border border-slate-600 hover:bg-slate-700",
  },
  グレー: {
    label: "グレー",
    dot:   "bg-amber-400",
    badge: "bg-amber-900/40 text-amber-300 border border-amber-700",
    btn:   "bg-amber-900/60 text-amber-300 border border-amber-700 hover:bg-amber-800",
  },
};

function categoryColor(category: string): string {
  if (category.includes("口座") || category.includes("eSIM"))
    return "bg-red-900/40 text-red-300 border border-red-800";
  if (category.includes("役割") || category.includes("隠語"))
    return "bg-orange-900/40 text-orange-300 border border-orange-800";
  return "bg-yellow-900/40 text-yellow-300 border border-yellow-800";
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("ja-JP", {
      month: "2-digit", day: "2-digit",
      hour:  "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

// ── PostCard ─────────────────────────────────────────────────────────────────

function PostCard({
  post,
  onStatusChange,
}: {
  post: MonitorPost;
  onStatusChange: (id: string, status: PostStatus, reportRef?: string) => void;
}) {
  const [refInput, setRefInput] = useState(post.reportRef ?? "");
  const [saving,   setSaving]   = useState(false);

  async function handleStatus(status: PostStatus) {
    setSaving(true);
    const ref = status === "通報済" ? refInput : undefined;
    await onStatusChange(post.id, status, ref);
    setSaving(false);
  }

  return (
    <div className={`bg-slate-900 border rounded-xl p-4 space-y-3 transition-opacity ${
      post.status === "誤報"  ? "opacity-40 hover:opacity-80" :
      post.status === "グレー" ? "border-amber-900/60" : ""
    }`}>
      {/* ヘッダー行 */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColor(post.category)}`}>
          {post.category}
        </span>
        <span className="text-xs text-slate-400 font-mono">{post.author}</span>
        <span className="text-xs text-slate-600 ml-auto">{fmtDate(post.detectedAt)}</span>
      </div>

      {/* グレーゾーン注釈 */}
      {post.status === "グレー" && (
        <div className="text-xs bg-amber-900/20 border border-amber-800/50 rounded-lg px-3 py-2 text-amber-300">
          ⚠️ <strong>グレーゾーン</strong> — 直接的な犯罪実行役募集ではないが、反社関与・法的グレーの可能性あり。IHC通報対象外。プラットフォームへの通報を推奨。
        </div>
      )}

      {/* 本文 */}
      <div className={`text-xs text-slate-300 leading-relaxed bg-slate-800 rounded-lg p-3 border-l-2 whitespace-pre-wrap font-mono ${
        post.status === "グレー" ? "border-amber-600" : "border-red-600"
      }`}>
        {post.text}
      </div>

      {/* アクションボタン */}
      <div className="flex gap-2 flex-wrap">
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors"
        >
          投稿を見る ↗
        </a>
        {post.status === "グレー" ? (
          <a
            href={`https://x.com/intent/report?tweet_id=${post.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-900/60 text-amber-300 border border-amber-800 hover:bg-amber-800 transition-colors"
          >
            Xに通報 ↗
          </a>
        ) : (
          <a
            href="https://www.internethotline.jp/services/reports/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-900/60 text-red-300 border border-red-800 hover:bg-red-800 transition-colors"
          >
            IHCに通報 ↗
          </a>
        )}
      </div>

      {/* ステータス切替 */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-500">ステータス:</span>
        {(["未対応", "グレー", "通報済", "誤報"] as PostStatus[]).map((s) => (
          <button
            key={s}
            disabled={saving}
            onClick={() => handleStatus(s)}
            className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-colors ${
              post.status === s
                ? STATUS_CFG[s].btn + " ring-1 ring-white/20"
                : "bg-slate-800 text-slate-500 border border-slate-700 hover:bg-slate-700"
            }`}
          >
            {STATUS_CFG[s].label}
          </button>
        ))}
        {saving && <span className="text-xs text-slate-600 animate-pulse">保存中…</span>}
      </div>

      {/* 通報済 → 参照番号入力 */}
      {post.status === "通報済" && (
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 whitespace-nowrap">IHC参照番号:</label>
          <input
            type="text"
            value={refInput}
            onChange={(e) => setRefInput(e.target.value)}
            onBlur={() => handleStatus("通報済")}
            placeholder="例: 1779311926-01771"
            className="flex-1 text-xs bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-green-600"
          />
          {post.reportRef && (
            <span className="text-xs text-green-400 font-mono whitespace-nowrap">✓ {post.reportRef}</span>
          )}
        </div>
      )}
    </div>
  );
}

// ── MonitorSection (メイン) ───────────────────────────────────────────────────

export default function MonitorSection() {
  const [posts,   setPosts]   = useState<MonitorPost[]>([]);
  const [filter,  setFilter]  = useState<Filter>("未対応");
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/monitor/posts");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPosts(data.posts ?? []);
      setLastRefresh(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "取得失敗");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleStatusChange = useCallback(async (
    id:        string,
    status:    PostStatus,
    reportRef?: string,
  ) => {
    // 楽観的更新
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status, reportRef: reportRef ?? p.reportRef } : p
      )
    );
    await fetch("/api/monitor/status", {
      method:  "PATCH",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ id, status, reportRef }),
    });
  }, []);

  // ── 統計 ────────────────────────────────────────────────────────────────────
  const counts = {
    total:  posts.length,
    未対応: posts.filter((p) => p.status === "未対応").length,
    グレー: posts.filter((p) => p.status === "グレー").length,
    通報済: posts.filter((p) => p.status === "通報済").length,
    誤報:   posts.filter((p) => p.status === "誤報").length,
  };

  const filtered = filter === "すべて"
    ? posts
    : posts.filter((p) => p.status === filter);

  return (
    <section>
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          🚨 Monitor — 闇バイト投稿
        </h2>
        <div className="flex items-center gap-3">
          {lastRefresh && (
            <span className="text-xs text-slate-600">
              {lastRefresh.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })} 更新
            </span>
          )}
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="text-xs text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-500 px-3 py-1 rounded-lg transition-colors disabled:opacity-40"
          >
            {loading ? "読込中…" : "↻ 更新"}
          </button>
        </div>
      </div>

      {/* 統計バー */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {[
          { label: "合計",   value: counts.total,   dot: "bg-slate-400"  },
          { label: "未対応", value: counts.未対応,  dot: "bg-yellow-400" },
          { label: "グレー", value: counts.グレー,  dot: "bg-amber-400"  },
          { label: "通報済", value: counts.通報済,  dot: "bg-green-400"  },
          { label: "誤報",   value: counts.誤報,    dot: "bg-slate-600"  },
        ].map(({ label, value, dot }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              <span className="text-xs text-slate-500">{label}</span>
            </div>
            <div className="text-xl font-black text-slate-200">{value}</div>
          </div>
        ))}
      </div>

      {/* フィルタータブ */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(["未対応", "グレー", "すべて", "通報済", "誤報"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
              filter === f
                ? "bg-slate-100 text-slate-900 border-transparent"
                : "bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500"
            }`}
          >
            {f}
            {f !== "すべて" && (
              <span className="ml-1.5 text-slate-500">
                {counts[f as keyof typeof counts]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* エラー */}
      {error && (
        <div className="bg-red-950 border border-red-800 rounded-xl p-4 text-xs text-red-300 mb-4">
          ⚠️ {error} — Redis未接続の可能性があります
        </div>
      )}

      {/* 投稿リスト */}
      {loading ? (
        <div className="text-xs text-slate-600 text-center py-12 animate-pulse">読み込み中…</div>
      ) : filtered.length === 0 ? (
        <div className="text-xs text-slate-600 text-center py-12 border border-slate-800 rounded-xl">
          {filter === "未対応" ? "✅ 未対応の投稿はありません" : "該当する投稿がありません"}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* 通報フローガイド */}
      {counts.未対応 > 0 && (
        <div className="mt-4 bg-red-950/40 border border-red-900 rounded-xl p-4 text-xs text-red-300 leading-loose">
          <strong className="block text-red-200 mb-1">📋 闇バイト通報フロー</strong>
          ① 「投稿を見る」でX確認 → ② 「IHCに通報」で通報 → ③ 参照番号を入力して「通報済」に変更 → ④ X投稿へコメント
        </div>
      )}
      {counts.グレー > 0 && (
        <div className="mt-4 bg-amber-950/40 border border-amber-900 rounded-xl p-4 text-xs text-amber-300 leading-loose">
          <strong className="block text-amber-200 mb-1">⚠️ グレーゾーン対応フロー</strong>
          打ち子・換金所・グレーギャンブル系はIHC通報対象外。① 「Xに通報」でプラットフォーム報告 → ② ステータスを「グレー」に設定して管理
        </div>
      )}
    </section>
  );
}
