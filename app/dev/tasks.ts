export type TaskStatus = "done" | "in-progress" | "todo" | "blocked";
export type Priority = "P1" | "P2" | "P3" | "P4" | "P5";

export type Task = {
  id: number;
  priority: Priority;
  status: TaskStatus;
  title: string;
  detail: string;
  completedAt?: string;
  blockedBy?: string;
};

export const TASKS: Task[] = [
  // ── P1 緊急（今週中）──────────────────────────────────────
  {
    id: 1,
    priority: "P1",
    status: "done",
    title: "x_broadcast.py：闇バイトキーワード追加",
    detail: "Grokプロンプトに「闇バイト」「やみバイト」を追加。漏れを修正。",
    completedAt: "2026-05-19",
  },
  {
    id: 2,
    priority: "P1",
    status: "done",
    title: "タスクスケジューラー修正（3回/日自動投稿）",
    detail: "00:30 / 05:30 / 13:30 の3本を安定稼働。UWPパス・バッチ文法バグを修正。",
    completedAt: "2026-05-20",
  },
  {
    id: 3,
    priority: "P1",
    status: "done",
    title: "用語集 11語 → 30語 拡充・デプロイ",
    detail: "運び屋・指示役・タコ部屋・荷物受け取りバイトなど19語追加。サイトマップ自動反映。",
    completedAt: "2026-05-19",
  },
  {
    id: 4,
    priority: "P1",
    status: "done",
    title: "未コミットファイルをコミット・Vercelデプロイ",
    detail: "about / privacy / contact / opengraph-image.tsx / vercel.json / globals.css / layout.tsx / sitemap.ts を反映。",
    completedAt: "2026-05-20",
  },
  {
    id: 5,
    priority: "P1",
    status: "done",
    title: ".gitignore に scripts/ を追加",
    detail: "APIキーを含むスクリプト群が誤コミットされないよう除外。",
    completedAt: "2026-05-20",
  },
  {
    id: 6,
    priority: "P1",
    status: "todo",
    title: "Vercel 環境変数の棚卸し・確認",
    detail: "GEMINI_API_KEY / XAI_API_KEY / X API 4点 / DEV_PASSWORD が正しく設定されているか確認。",
  },

  // ── P2 今月中（安定性・信頼性）──────────────────────────────
  {
    id: 7,
    priority: "P2",
    status: "todo",
    title: "x_broadcast.py の UWP パス問題を恒久対応",
    detail: "Claude_pzs8sxrjxfjjc というアプリIDをハードコードしている。通常ターミナルから pip 再インストールで根本解決。",
  },
  {
    id: 8,
    priority: "P2",
    status: "todo",
    title: "レートリミット用 Redis（Vercel KV）を設定",
    detail: "rateLimit.ts 実装済み・REDIS_URL 未設定。現在フェイルオープン（制限が実際には働いていない）。",
  },
  {
    id: 9,
    priority: "P2",
    status: "todo",
    title: "run_broadcast.bat のログファイル名を整備",
    detail: "task_debug.log → broadcast.log にリネーム。30日ローテーションを追加。",
  },
  {
    id: 10,
    priority: "P2",
    status: "todo",
    title: "MEMORY.md を最新状態に更新",
    detail: "自動投稿修正完了・コンポーネント分割・用語集30語の完了を反映。",
  },

  // ── P3 SEO強化フェーズ（最優先の成長施策）────────────────────
  {
    id: 11,
    priority: "P3",
    status: "todo",
    title: "用語集 30語 → 100語 拡充",
    detail: "「即日払い 危険」「身分証 送る バイト」「telegram 副業」等の高意図ロングテールキーワードを狙う。",
  },
  {
    id: 12,
    priority: "P3",
    status: "todo",
    title: "Schema.org FAQ スキーマ 全ページ追加",
    detail: "Googleリッチリザルト（アコーディオン表示）でクリック率2〜3倍。実装コスト低・費用対効果最大。",
  },
  {
    id: 13,
    priority: "P3",
    status: "todo",
    title: "新コンテンツページ 4本追加",
    detail: "「闇バイトの断り方」「被害に遭ったらやること」「保護者・学校向けガイド」「逮捕・判決事例まとめ」",
  },

  // ── P4 自動化拡張（1〜2ヶ月後）──────────────────────────────
  {
    id: 14,
    priority: "P4",
    status: "todo",
    title: "TikTok / YouTube Shorts 自動配信",
    detail: "x_broadcast.py を拡張。RSS → Geminiナレーション → 縦型動画 → 自動アップロード。月1,000PV達成後に着手。",
  },
  {
    id: 15,
    priority: "P4",
    status: "todo",
    title: "A8 アフィリエイト収益の最適化",
    detail: "Norton / 弁護士LP へのリンクを戦略的配置。月額固定費の自己調達を目指す。",
  },

  // ── P5 将来フェーズ（3ヶ月以降）──────────────────────────────
  {
    id: 16,
    priority: "P5",
    status: "todo",
    title: "OSINT 脅威データベース（内部蓄積）",
    detail: "チェッカー入力からTelegram ID・隠語を自動抽出・蓄積。まず内部DB → 後から外部API公開（法務確認後）。",
    blockedBy: "流入増加 + 法務確認",
  },
  {
    id: 17,
    priority: "P5",
    status: "todo",
    title: "外部 API パートナーシップ",
    detail: "セキュリティソフト・学校フィルタリングツールへのAPI提供。DB実績構築後に着手。",
    blockedBy: "OSINT DB 完成後",
  },
];

export const PRIORITY_LABELS: Record<Priority, { label: string; color: string; bg: string; border: string }> = {
  P1: { label: "P1 緊急", color: "text-red-700",   bg: "bg-red-50",    border: "border-red-200" },
  P2: { label: "P2 今月", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
  P3: { label: "P3 SEO",  color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  P4: { label: "P4 拡張", color: "text-green-700",  bg: "bg-green-50",  border: "border-green-200" },
  P5: { label: "P5 将来", color: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200" },
};

export const STATUS_CONFIG: Record<TaskStatus, { icon: string; label: string; color: string }> = {
  done:        { icon: "✅", label: "完了",     color: "text-green-600" },
  "in-progress":{ icon: "🔄", label: "進行中",   color: "text-blue-600" },
  todo:        { icon: "⬜", label: "未着手",   color: "text-slate-400" },
  blocked:     { icon: "🚫", label: "ブロック中", color: "text-red-400" },
};
