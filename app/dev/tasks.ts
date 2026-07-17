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
    status: "done",
    title: "Vercel 環境変数の棚卸し・確認",
    detail: "AUTH_SECRET / AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET / ALLOWED_DEV_EMAIL / REDIS_URL を確認・設定完了。",
    completedAt: "2026-05-20",
  },

  // ── P2 今月中（安定性・信頼性）──────────────────────────────
  {
    id: 7,
    priority: "P2",
    status: "done",
    title: "x_broadcast.py の UWP パス問題を恒久対応",
    detail: "通常 cmd から pip install で C:\\Python314\\Lib\\site-packages に再インストール。UWP ハードコードパスを削除。",
    completedAt: "2026-05-20",
  },
  {
    id: 8,
    priority: "P2",
    status: "done",
    title: "レートリミット用 Redis（Vercel KV）を設定",
    detail: "safebite-kv として REDIS_URL が Vercel に設定済みであることを確認。rateLimit.ts が正常に動作。",
    completedAt: "2026-05-20",
  },
  {
    id: 9,
    priority: "P2",
    status: "done",
    title: "run_broadcast.bat のログファイル名を整備",
    detail: "runner.log（bat制御ログ）と broadcast.log（Python詳細ログ）に分離。PYTHONPATH の競合も解消。",
    completedAt: "2026-05-20",
  },
  {
    id: 10,
    priority: "P2",
    status: "done",
    title: "MEMORY.md を最新状態に更新",
    detail: "自動投稿・Google OAuth・コンポーネント分割・用語集30語・セキュリティヘッダー等を全反映。",
    completedAt: "2026-05-20",
  },

  // ── P3 SEO強化フェーズ（最優先の成長施策）────────────────────
  {
    id: 11,
    priority: "P3",
    status: "done",
    title: "用語集 30語 → 100語 拡充",
    detail: "category/seoTitle/seoDescription フィールド追加。Cat1:募集フレーズ25語 / Cat2:役割隠語25語 / Cat3:手口・ツール50語。カテゴリタブUI・個別SEOメタ最適化も完了。",
    completedAt: "2026-05-21",
  },
  {
    id: 12,
    priority: "P3",
    status: "done",
    title: "Schema.org FAQ スキーマ 全ページ追加",
    detail: "個別ページ: FAQPage（3問）+ Article。一覧: ItemList（100語）。トップ: WebSite + SoftwareApplication + Organization。Googleリッチリザルト対応完了。",
    completedAt: "2026-05-21",
  },
  {
    id: 13,
    priority: "P3",
    status: "done",
    title: "新コンテンツページ 4本追加",
    detail: "「闇バイトの断り方」「被害に遭ったらやること」「保護者・学校向けガイド」「逮捕・判決事例まとめ」。Article+FAQPage+BreadcrumbList JSON-LD・相談窓口・関連ガイドリンク・サイトマップ反映。",
    completedAt: "2026-05-21",
  },

  // ── P3 セキュリティ・品質（2026-05-22 完了）────────────────────
  {
    id: 18,
    priority: "P3",
    status: "done",
    title: "全APIルート セキュリティ強化",
    detail: "fetch-tweet / contact / counter / monitor/ingest / monitor/posts / monitor/status 全6エンドポイントにレートリミット追加。ingest にフィールドバリデーション・最大50件制限も実装。",
    completedAt: "2026-05-22",
  },
  {
    id: 19,
    priority: "P3",
    status: "done",
    title: "モニターダッシュボード（/dev）構築",
    detail: "x_monitor.py の検知投稿をRedisに蓄積。/devページにMonitorSectionを追加。未対応/通報済/誤報のステータス管理・IHC参照番号入力・フィルタータブ完備。",
    completedAt: "2026-05-22",
  },
  {
    id: 20,
    priority: "P3",
    status: "done",
    title: "サイト全面リデザイン（警視庁風）",
    detail: "ヒーローをdark slate-950に変更。SectionTitleコンポーネント（英語ラベルチップ+大見出し）を全セクションに適用。NavBar・GuideSection・AboutSectionをダーク化。インパクトメッセージ追加。",
    completedAt: "2026-05-22",
  },
  {
    id: 21,
    priority: "P3",
    status: "done",
    title: "X Premium対応 v5.1（スレッド戦略）",
    detail: "INFO/CTAをスレッド投稿化（本文URLなし→自己リプライでリンク提供）。ENGAGE全角200文字に拡張。カード画像をダークテーマにリブランド。ニュースフィルターを闇バイト特化に修正。",
    completedAt: "2026-05-22",
  },

  // ── P3 SNS拡張（短期：Month 1-3）────────────────────────────
  {
    id: 22,
    priority: "P3",
    status: "in-progress",
    title: "TikTokアカウント開設・初投稿10本",
    detail: "@safebite_jp でアカウント開設済み・2本投稿済み（2026-05-26）。1本目:ツール紹介 2本目:UD隠語クイズ。残り8本を投稿予定。「隠語クイズ」「逮捕事例速報」「断り方ロールプレイ」の3パターン。Bioにsaferbite.orgリンク設置。バズった後に自動化（Task #28）へ。",
  },
  {
    id: 23,
    priority: "P3",
    status: "done",
    title: "GA4アナリティクス 実装・流入計測開始",
    detail: "G-38B60QXS6D で設置済み。RouteTracker.tsx でSPAページ遷移を計測。イベント: ai_check / checker_started / share / affiliate_click / report_generated / sos_template_generated / contact_submitted / ihc_link_opened。ダッシュボードでキーイベント設定は初回イベント発火後（24h以内）にスターをクリック。",
    completedAt: "2026-05-22",
  },
  {
    id: 25,
    priority: "P3",
    status: "todo",
    title: "Instagramアカウント開設・リール投稿",
    detail: "TikTok動画をリールとして流用（編集コストゼロ）。ストーリーズで「今日の逮捕事例」を日次更新。ハイライトに「SafeBiteの使い方」を固定。TikTok（#22）開設後に着手。",
  },
  {
    id: 24,
    priority: "P3",
    status: "todo",
    title: "PR Timesでプレスリリース投稿（無料）",
    detail: "TikTok・Instagram開設後に「SNS×AIツール公開」としてリリースするとニュース性が増す。原稿作成済み。DA50+のバックリンク獲得とメディア露出を狙う。見出し：「闇バイト被害ゼロを目指す無料AIツールSafeBite公開」。",
  },

  // ── P4 中期拡張（Month 4-12）──────────────────────────────
  {
    id: 26,
    priority: "P4",
    status: "todo",
    title: "警察庁・都道府県警リンク集への掲載申請",
    detail: "keishicho_tokuryu のリンク集ページに SafeBite を掲載申請。警視庁・各都道府県警の「関連リンク」ページへの申請フォーム送信。DA80+バックリンク＋信頼性が一気に上がる。",
  },
  {
    id: 27,
    priority: "P4",
    status: "todo",
    title: "LINE OpenChat 開設（国内最大到達）",
    detail: "「闇バイト・怪しいDM 相談所」としてOpenChatを開設。人が投稿した求人文をSafeBiteでチェック→結果を返信。週1回管理で数百〜数千人にリーチ。",
  },
  {
    id: 28,
    priority: "P4",
    status: "todo",
    title: "TikTok / Instagram 自動投稿システム",
    detail: "x_broadcast.pyを拡張。Gemini動画ナレーション→縦型動画生成→TikTok API/Meta Graph APIで自動アップロード。月UV 15,000達成後に着手。",
  },
  {
    id: 29,
    priority: "P4",
    status: "todo",
    title: "A8 アフィリエイト収益の最適化",
    detail: "Norton / 弁護士LP へのリンクを戦略的配置。チェッカー結果画面のスコア70以上で Norton 表示（実装済み）。GuideSection CTAにも追加。月額固定費の自己調達を目指す。",
  },

  // ── P3 SEO施策（2026-07-13 GA4分析に基づく）────────────────────
  {
    id: 32,
    priority: "P3",
    status: "done",
    title: "「うさぎ」隠語ページ新規作成 /glossary/usagi",
    detail: "Search Consoleで161表示・0クリック・11位のキーワード「闇バイト 隠語 うさぎ」向けに専用ページを作成。語源・募集文例・罰則・チェックリスト・断り方・関連隠語のH2構成。FAQ JSON-LD・Article JSON-LD・BreadcrumbList追加。terms.tsにも追記しサイトマップ自動反映。",
    completedAt: "2026-07-13",
  },
  {
    id: 33,
    priority: "P3",
    status: "done",
    title: "/guide/taiho-jirei SEO強化（CTR向上）",
    detail: "タイトルに「2026年最新」を追加（CTR22.6%→向上狙い）。「最終更新：2026年7月」テキスト追加。内部リンク（受け子・出し子・うさぎ）追加。/glossary/usagi を関連ガイドに追加。dateModified を2026-07-13に更新。「一言で言うと」AEOボックス追加。",
    completedAt: "2026-07-13",
  },
  {
    id: 34,
    priority: "P3",
    status: "done",
    title: "トップページ直帰率改善（HeroTextarea内判定表示）",
    detail: "HeroTextareaをスタンドアロン化。判定ボタン押下でスクロール不要・ヒーロー内に結果表示（スコアバー・理由・アドバイス・キーワード・通報リンク）。ヒーロー直下に最近の逮捕事例3件セクション＋社会的証明（統計数値）セクションを追加。直帰率82%の改善を狙う。",
    completedAt: "2026-07-13",
  },
  {
    id: 35,
    priority: "P3",
    status: "done",
    title: "Bing SEO最適化（robots.ts・sitemap優先度調整）",
    detail: "app/robots.tsを新規作成（全クローラーOK、/dev/ /api/ は除外、sitemap URLとhost指定）。/guide/taiho-jirei と /glossary/usagi のsitemap優先度を0.9に設定。Bing Webmaster Toolsへの手動登録は別途対応。",
    completedAt: "2026-07-13",
  },
  {
    id: 36,
    priority: "P3",
    status: "done",
    title: "AEO（AI検索最適化）全ガイドページに「一言で言うと」ボックス追加",
    detail: "kotowarikata・higai-soudan・taiho-jirei・hogoshaの4ページH1直下に「一言で言うと」ボックスを追加。Bing/CopilotのAI検索で直接回答として引用されやすい形式。/glossary/usagiには作成時から組み込み済み。",
    completedAt: "2026-07-13",
  },

  // ── P3 収益化・成長戦略の再設計（2026-07-13）────────────────────
  {
    id: 37,
    priority: "P3",
    status: "done",
    title: "弁護士アフィリエイトを撤去（弁護士法リスク回避）",
    detail: "「詐欺事件を成果報酬で弁護士紹介」は弁護士法13条/72条の懲戒事例に該当（東京弁護士会が詐欺事件5,000円/件を懲戒）。闇バイト=詐欺事件のため、LawyerCTAをA8アフィリンクから法テラス（公的機関）への非アフィリエイト導線に置換。GA4も public_resource_click に変更。",
    completedAt: "2026-07-13",
  },
  {
    id: 38,
    priority: "P3",
    status: "done",
    title: "横展開記事第1弾 /guide/shakkin-deguchi 作成",
    detail: "「借金で闇バイトに手を出す前に｜合法の出口・債務整理」を新規作成。借金→闇バイトの入口を断つミッション整合コンテンツ。検索volume・商業意図とも高い「借金 相談/債務整理 とは」を狙い、将来の債務整理アフィリ（ASP単価¥1万超・規制クリーン）の受け皿を兼ねる。Article+FAQ+Breadcrumb JSON-LD、一言で言うとボックス、taiho-jirei/kotowarikataから内部リンク。",
    completedAt: "2026-07-13",
  },
  {
    id: 39,
    priority: "P3",
    status: "todo",
    title: "【オーナー】A8で債務整理案件に提携→CTAリンク差し替え",
    detail: "shakkin-deguchi等の受け皿に債務整理アフィリを設置するため、A8.netで債務整理プログラムに提携し、素材コード（インプ計測用0.gifピクセル含む）を取得。取得後にClaudeがCTA実装。刑事系（弁護士）は規制リスクのため使わない。",
  },
  {
    id: 41,
    priority: "P3",
    status: "done",
    title: "横展開記事第2弾 /guide/fukugyo-sagi 作成",
    detail: "「副業詐欺の手口と見分け方」を新規作成。「副業 稼げる/副業 詐欺 見分け方」で検索する闇バイト予備軍を捕捉し、安全な求人（アルバイトEX）への導線に接続。6手口・チェックリスト・返金相談先（消費者ホットライン188）・FAQ JSON-LD。ホームGuideSectionに副業詐欺+借金の2カードを追加しトップから内部リンク。sitemap登録。",
    completedAt: "2026-07-13",
  },
  {
    id: 42,
    priority: "P3",
    status: "done",
    title: "闇バイト危険度セルフ診断 /shindan を新規実装",
    detail: "チェッカー利用ゼロ（GA4）の主因＝「求人文コピペ前提で摩擦が高い／調べに来ただけの人が使えない」を解消。5問はい/いいえで危険度を算出する低摩擦・拡散型ツール。荷物受取/口座貸与はcritical判定で最低75点。結果はX/LINEシェア可・AIチェッカー/記事へ内部リンク。GA4: shindan_started/shindan_completed。ホームHeroSubActions・sitemapに導線追加。API費用ゼロ（クライアント計算）。",
    completedAt: "2026-07-13",
  },
  {
    id: 43,
    priority: "P3",
    status: "done",
    title: "債務整理アフィリエイトを /guide/shakkin-deguchi に設置",
    detail: "A8で債務整理案件の提携承認（2026-07-13）。DebtConsolidationCTA（PR表記・rel=sponsored・GA4 affiliate_click:saimuseiri）を債務整理解説の直後に設置。法テラス（公的）を先に案内した上での民間選択肢という配置。刑事系と異なり規制クリーン。※インプ計測用0.gifピクセルは未実装（A8素材コードのimg URLが必要）。",
    completedAt: "2026-07-13",
  },
  {
    id: 44,
    priority: "P3",
    status: "todo",
    title: "【オーナー】A8 債務整理のインプ計測ピクセル設置",
    detail: "表示回数を計測するため、A8の債務整理素材コードに含まれる <img src=\"https://www○○.a8.net/0.gif?a8mat=...\"> のURLを取得してClaudeに渡す。クリック計測は既に稼働中だが、表示回数を見るにはピクセルが必要。",
  },
  {
    id: 45,
    priority: "P3",
    status: "done",
    title: "E-E-A-T強化：公的一次情報への出典明示＋編集方針の公開",
    detail: "Google不可視（Bing85人/Google8人・平均13位）の主因＝YMYL領域での信頼性不足に対応。Sources.tsx（出典コンポーネント）を新規作成し、警察庁統計・e-Gov法令・こども家庭庁・文科省へのリンク（全URL HTTP 200確認済み）を taiho-jirei / fukugyo-sagi / shakkin-deguchi / usagi に設置。/about に「編集・情報作成方針」セクションを追加し一次情報ベースの作成体制を明示。",
    completedAt: "2026-07-13",
  },
  {
    id: 46,
    priority: "P2",
    status: "done",
    title: "Search Console: sitemap再送信＋新ページのインデックス確認（Claude in Chromeで実施）",
    detail: "調査の結果 saferbite.org は登録済みだった（誤登録の前提が古かった）。sitemap.xml を再送信し検出104→113ページに更新。URL検査の結果: /shindan・/guide/fukugyo-sagi・/guide/shakkin-deguchi は当日中にインデックス登録済みを確認。/glossary/usagi は未登録だったため「インデックス登録をリクエスト」実行（優先クロールキュー入り）。",
    completedAt: "2026-07-17",
  },
  {
    id: 47,
    priority: "P3",
    status: "in-progress",
    title: "Bing Webmaster Tools 登録（オーナーのログイン待ち）",
    detail: "流入の69%がBingなのに未登録。bing.com/webmasters は未ログインのためClaudeでは認証不可。【オーナー】MicrosoftまたはGoogleアカウントでログインだけ実施 → 以降のサイト追加・GSCインポートはClaudeが代行可能。",
  },
  {
    id: 48,
    priority: "P3",
    status: "todo",
    title: "【オーナー】監修者の確保（弁護士 or 元警察官）",
    detail: "YMYLで最大のSEOレバー。知人・地元の弁護士会・法テラス経由などで「記事監修」として名前掲載の許可をもらう。獲得後、Claudeが監修者表記+Person schemaを全記事に実装。",
  },
  {
    id: 49,
    priority: "P4",
    status: "todo",
    title: "【オーナー】公的機関リンク集への掲載申請",
    detail: ".go.jp被リンクはTikTok1万再生よりSEOに効く。候補: こども家庭庁・都道府県警サイバー窓口・自治体消費生活センター・教育委員会。お問い合わせフォームから「闇バイト対策の無料公益ツールとして紹介いただけないか」と打診。",
  },
  {
    id: 40,
    priority: "P4",
    status: "todo",
    title: "公益モデルへの布石（助成金・自治体/学校連携）",
    detail: "本命の資金源。こども家庭庁・文科省が闇バイト対策を国策化。日本財団・住友財団・トヨタ財団・助成財団センター(jfc.or.jp)で公募検索。マイナビ×警察の高校出張授業＝B2G/B2B市場が実在。半年後の申請に向け、法人格検討＋PV・社会的実績を蓄積。",
  },

  // ── P5 将来フェーズ（3ヶ月以降）──────────────────────────────
  {
    id: 30,
    priority: "P5",
    status: "todo",
    title: "OSINT 脅威データベース（内部蓄積）",
    detail: "チェッカー入力からTelegram ID・隠語を自動抽出・蓄積。まず内部DB → 後から外部API公開（法務確認後）。",
    blockedBy: "流入増加 + 法務確認",
  },
  {
    id: 31,
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
