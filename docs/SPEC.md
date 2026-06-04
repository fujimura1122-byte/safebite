# SafeBite 技術仕様書

## プロジェクト概要

**SafeBite（セーフバイト）** は闇バイト被害ゼロを目指す無料公益Webサービス。
- URL: https://saferbite.org
- オーナー: Atsushi Fujimura（fujimura1122@gmail.com）
- リポジトリ: https://github.com/fujimura1122-byte/safebite
- デプロイ: Vercel（fujimura1122-bytes-projects/safebite）

---

## 技術スタック

| 分類 | 技術 |
|------|------|
| フレームワーク | Next.js 14 App Router（TypeScript） |
| スタイリング | Tailwind CSS v4 |
| 認証 | NextAuth v5（Google OAuth） |
| AI | Anthropic Claude API（@anthropic-ai/sdk） |
| データストア | ioredis（Upstash Redis） |
| メール送信 | Resend |
| メール受信 | Cloudflare Email Workers + Workers |
| アナリティクス | GA4（G-38B60QXS6D） |
| デプロイ | Vercel（GitHub連携、pushで自動デプロイ） |
| ドメイン管理 | Cloudflare（saferbite.org） |

---

## 環境変数（Vercel Production）

| 変数名 | 用途 | 設定先 |
|--------|------|--------|
| `ANTHROPIC_API_KEY` | Claude API | Vercel Production |
| `REDIS_URL` | Upstash Redis 接続URL | Vercel All |
| `AUTH_SECRET` | NextAuth シークレット | Vercel All |
| `AUTH_GOOGLE_ID` | Google OAuth Client ID | Vercel Preview/Production |
| `AUTH_GOOGLE_SECRET` | Google OAuth Client Secret | Vercel Preview/Production |
| `ALLOWED_DEV_EMAIL` | /dev アクセス許可メール | Vercel All |
| `RESEND_API_KEY` | Resend メール送信API | Vercel Production |
| `EMAIL_INBOUND_SECRET` | Worker→API認証トークン | Vercel Production |
| `MONITOR_SECRET` | X監視API認証 | Vercel Production |

**注意**: `EMAIL_INBOUND_SECRET` は現在 `safebite-email-inbound-18716`。
Vercel CLI での env 設定時は PowerShell の BOM 問題に注意（`$OutputEncoding = [System.Text.Encoding]::ASCII` を先に実行）。

---

## ディレクトリ構成

```
saferbite.org/
├── app/
│   ├── _components/          # 共通コンポーネント
│   │   ├── CheckerSection.tsx  # AIチェッカー本体
│   │   ├── RouteTracker.tsx    # GA4 SPA追跡
│   │   └── tracking.ts         # sendGA() ユーティリティ
│   ├── api/
│   │   ├── analyze/            # POST /api/analyze — Claude AI判定
│   │   ├── contact/            # POST /api/contact — お問い合わせ
│   │   ├── email/
│   │   │   ├── inbound/        # POST /api/email/inbound — Worker受信webhook
│   │   │   ├── inbox/          # GET/PATCH/DELETE /api/email/inbox
│   │   │   └── send/           # POST /api/email/send — Resend送信
│   │   ├── monitor/
│   │   │   ├── ingest/         # POST /api/monitor/ingest — 検知投稿保存
│   │   │   ├── posts/          # GET /api/monitor/posts — 投稿一覧
│   │   │   └── status/         # PATCH /api/monitor/status — ステータス更新
│   │   ├── counter/            # チェック回数カウンター
│   │   └── fetch-tweet/        # X投稿取得
│   ├── lib/
│   │   ├── emailStore.ts       # Redis: メール保存・取得・削除
│   │   ├── monitorStore.ts     # Redis: モニター投稿管理
│   │   └── rateLimit.ts        # Redis: IPレートリミット
│   ├── dev/                    # 管理ダッシュボード（認証必須）
│   │   ├── page.tsx            # メインダッシュボード
│   │   ├── tasks.ts            # タスク一覧（ここを更新して進捗管理）
│   │   ├── login/              # /dev/login
│   │   └── _components/
│   │       ├── EmailSection.tsx   # メール受信箱UI
│   │       └── MonitorSection.tsx # X監視パネルUI
│   ├── glossary/               # 闇バイト隠語辞典（100語）
│   ├── guide/                  # コンテンツページ群
│   ├── contact/                # お問い合わせフォーム
│   ├── about/                  # 運営者情報
│   ├── privacy/                # プライバシーポリシー
│   ├── layout.tsx              # GA4スクリプト、RouteTracker
│   └── sitemap.ts              # 自動サイトマップ生成
├── scripts/
│   ├── cloudflare-email-worker/   # Cloudflare Email Worker
│   │   ├── src/index.js           # email()ハンドラ（postal-mime使用）
│   │   └── wrangler.toml
│   ├── x_broadcast.py          # X自動投稿スクリプト（現在停止中）
│   ├── x_monitor.py            # X闇バイト監視スクリプト
│   └── .env                    # ローカル用（gitignore済み）
├── auth.ts                     # NextAuth設定
├── middleware.ts               # /dev/* 認証ミドルウェア
└── docs/
    ├── SPEC.md                 # 本ファイル
    └── OPERATIONS.md           # 運用マニュアル
```

---

## 主要APIエンドポイント

### POST /api/analyze
- Claude AIで闇バイト危険度を判定
- 認証不要（レートリミットあり）
- Body: `{ text: string }`
- Response: `{ score, label, reason, keywords }`

### POST /api/email/inbound
- Cloudflare Email Workerからの受信webhook
- Bearer認証: `EMAIL_INBOUND_SECRET`（BOM自動除去済み）
- Body: `{ from, to, subject, textBody, htmlBody }`
- Response: `{ ok: true, id }`

### GET /api/email/inbox
- /dev 受信箱データ取得（NextAuth認証必須）
- Response: `{ inbox: InboundEmail[], sent: OutboundEmail[], unread: number }`

### POST /api/contact
- お問い合わせフォーム送信
- スパム防止: レートリミット5回/時 + ハニーポット + URLフィルター + キーワードフィルター
- 正常送信は saveInbound() で /dev 受信箱に保存

### POST /api/monitor/ingest
- x_monitor.py からの闇バイト検知投稿保存
- Bearer認証: `MONITOR_SECRET`

---

## Redis キー設計

```
# メール
email:inbox:ids          List<id>  受信メールID一覧（新着順）
email:sent:ids           List<id>  送信メールID一覧
email:{id}               JSON      メール本体（InboundEmail | OutboundEmail）

# モニター
monitor:post:ids         List<id>  検知投稿ID一覧
monitor:post:{id}        JSON      投稿本体（MonitorPost）

# レートリミット
rl:{key}:{ip}            number    カウンター（TTL付き）

# チェッカー
checker:count            number    総チェック回数
```

---

## メールシステム構成

```
contact@saferbite.org に着信
  ↓
Cloudflare Email Routing（ルール: Active）
  ↓
safebite-email-worker（Cloudflare Workers）
  ・postal-mime でメールパース
  ・BOMを除去してBearer認証
  ↓
POST /api/email/inbound（Vercel）
  ↓
saveInbound() → Redis 保存
  ↓
/dev Email セクションに表示
```

**Worker シークレット**: `EMAIL_INBOUND_SECRET = safebite-email-inbound-18716`
**Worker再デプロイ**: `cd scripts/cloudflare-email-worker && npx wrangler deploy`

---

## 認証・セキュリティ

### /dev アクセス制御
- `middleware.ts` で `/dev/*` を保護
- NextAuth Google OAuth
- `ALLOWED_DEV_EMAIL` に一致するGoogleアカウントのみアクセス可

### APIセキュリティ
- 全エンドポイントにIPベースのレートリミット（`checkRateLimit(ip, key, limit, ttl)`）
- inbound/monitor は Bearer Token 認証
- contact フォームはハニーポット + コンテンツフィルター

---

## Cloudflare 構成

- **ドメイン**: saferbite.org → Cloudflare DNS管理
- **Email Routing**: Enabled、MX設定済み
  - ルール: `contact@saferbite.org` → Worker: `safebite-email-worker`（Active）
- **Workers**: `safebite-email-worker`（Workers & Pagesにデプロイ済み）
- **Workers認証**: `~/.wrangler/config/default.toml` のOAuthトークン（有効期限あり。期限切れの場合 `npx wrangler login` で再認証）

---

## GA4設定

- 測定ID: `G-38B60QXS6D`
- カスタムイベント（`sendGA(eventName, params)`で送信）:
  - `ai_check` — チェッカー結果
  - `checker_started` — チェック開始
  - `share` — シェア
  - `affiliate_click` — アフィリエイトリンク
  - `contact_submitted` — 問い合わせ送信
  - `ihc_link_opened` — IHCリンク
  - `police_link_opened` — 警察リンク

---

## X（Twitter）自動投稿

**現状: 凍結中（2026-05-26）**
- アカウント: @bite_safe（凍結中、異議申し立て済み）
- スクリプト: `scripts/x_broadcast.py`
- スケジューラー: Windows タスクスケジューラー（現在Disabled）
  - SafeBite_Broadcast_0030 / 0530 / 1330
- 監視スクリプト: `scripts/x_monitor.py`（SafeBite_Monitor、継続稼働中）

**再開手順**: タスクスケジューラーで各タスクを Enable に変更

---

## TikTok

- アカウント: @safebite_jp（https://www.tiktok.com/@safebite_jp）
- 投稿本数: 2/10本（2026-05-26時点）
- 次のアクション: 残り8本を週2〜3本ペースで投稿

---

## デプロイ手順

```powershell
# コード変更後
git add <files>
git commit -m "メッセージ"
git push origin main  # Vercelが自動デプロイ

# Vercel環境変数の変更（BOM対策必須）
$OutputEncoding = [System.Text.Encoding]::ASCII
"value" | npx vercel env add VARIABLE_NAME production

# Cloudflare Workerのデプロイ
cd scripts/cloudflare-email-worker
npx wrangler deploy

# Workerシークレットの設定（BOM対策必須）
$OutputEncoding = [System.Text.Encoding]::ASCII
"value" | npx wrangler secret put SECRET_NAME --name safebite-email-worker
```

---

## 既知の問題・注意事項

1. **PowerShell BOM問題**: `echo` や通常のパイプでシークレットを設定するとUTF-8 BOMが混入する。必ず `$OutputEncoding = [System.Text.Encoding]::ASCII` を先に実行すること。

2. **Wrangler OAuthトークン有効期限**: `~/.wrangler/config/default.toml` のトークンは約1時間で期限切れ。期限切れの場合 `npx wrangler login` で再認証。

3. **wrangler deployのworkers.devエラー**: `You can either deploy your worker to one or more routes...` というエラーが出るが、Email Workerには不要なので無視してよい。`Uploaded` が表示されれば成功。

4. **Google Search Console**: 現在 `saferbite-zeta.vercel.app`（Vercelプレビュー）が登録されている。`saferbite.org` を正しく登録する必要あり（DNS TXTレコードで認証）。
