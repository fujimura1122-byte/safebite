# SafeBite（saferbite.org）閉鎖手順書

**決定**: 完全閉鎖（ドメインも手放す）
**方針変更（2026-11-15）**: 即時閉鎖はせず、**ドメイン失効日 2027-05-19 までサイトを公開したまま運用**し、自然失効をもって終了する。

| | |
|---|---|
| 運用開始 | 2026-05-19 |
| **サービス終了日** | **2027-05-19**（ドメイン失効日） |
| 終了告知の表示開始 | 2027-03-19（自動） |

---

## 最終実績（記録）

| 指標 | 件数 |
|------|------|
| AIチェッカー利用 | 50 |
| 通報文生成 | 117 |
| IHC通報確認 | 109 |
| SOSテンプレ生成 | 1 |
| X監視での闇バイト検知投稿 | 200（削除済み） |

詳細: `C:\Users\Atsushi Fujimura\Documents\safebite-最終実績記録.json`

---

## ✅ 完了済み

- [x] **X自動投稿タスク停止** — SafeBite_Broadcast_0030 / 0530 / 1330 を Disabled（2026-05-26）
- [x] **X監視タスク停止** — SafeBite_Monitor を Disabled（2026-10-21）
- [x] **Redis全データ削除** — 205キーを削除、残存0件（2026-11-15）
  - 監視検知投稿200件（X利用者の第三者データ）を消去
  - お問い合わせ経由の個人情報は元々0件
  - 実績カウンターのみ上記JSONに退避してから削除
- [x] **ドメイン自動更新をOFF** — Cloudflareで設定、再読込で保持を確認（2026-11-15）
  - → これにより **2027-05-19 に自動失効**する。以後の更新料は発生しない
  - ※ 同アカウントの `manseki.app` は自動更新ONのまま（無関係なので変更していない）
- [x] **サービス終了のお知らせバナーを実装**（2026-11-15）
  - `app/_components/ClosureNotice.tsx` を `layout.tsx` に設置、全ページ共通
  - **2027-03-19 から自動で表示開始**（人が覚えておく必要なし）
  - 公的窓口（#9110 / 法テラス / こども家庭庁）へ誘導
  - クライアントコンポーネントで実装。サーバー側で日付判定するとビルド時刻で
    固定され永久に表示されないため、訪問者のブラウザで現在日時を判定している

---

## 🔵 いまは何もしなくてよい（2027年5月まで）

サイトは公開したまま、通常どおり利用できる状態を維持する。
X監視の自動取得は停止済みなので、新たなデータ蓄積は発生しない。
ドメイン更新料も自動更新OFF済みのため追加で発生しない。

**注意**: `contact@saferbite.org` は受信可能な状態が続く。
問い合わせが来ても対応しない場合は、下記「任意」の対応を検討する。

---

## 📌 2027年5月（終了直前）に行う作業

この2つを実施すると実質的に閉鎖が完了する。**それまでは実行しないこと**
（先に実行するとサイトが消える / 問い合わせが黙って壊れる）。

### 1. Cloudflare — Email Routing を無効化
- dash.cloudflare.com → saferbite.org → **Email** → Email Routing を Disable
- `contact@saferbite.org` の受信が停止する

### 2. Vercel — プロジェクト削除
- https://vercel.com/fujimura1122-bytes-projects/safebite → Settings → 最下部 **Delete Project**
- これでサイトが表示されなくなる

---

## 🟡 任意・好きなタイミングで（課金停止・アカウント整理）

### Upstash — Redisデータベース削除
- データは既に空。課金停止のためDB自体を削除

### アフィリエイト — 提携解除・退会
- **A8.net**（https://pub.a8.net）— 債務整理・ノートンの提携解除 → 退会
- **バリューコマース**（アルバイトEX）— 提携解除 → 退会
- ※ 未確定の成果報酬がある場合は入金後に退会すること

### Resend
- https://resend.com/dashboard → APIキー削除 → アカウント削除

### SNSアカウント
- **TikTok @safebite_jp** — 削除 or 放置
- **X @bite_safe** — 凍結中。異議申し立てを取り下げて放置でよい

### 計測ツール
- **GA4**（G-38B60QXS6D）/ **Google Search Console** — プロパティ削除

### GitHub
- https://github.com/fujimura1122-byte/safebite — Private化 または Archive

### ローカル環境
- Windowsタスクスケジューラーから SafeBite_* 4タスクを削除
  ```powershell
  schtasks /Delete /TN "SafeBite_Monitor" /F
  schtasks /Delete /TN "SafeBite_Broadcast_0030" /F
  schtasks /Delete /TN "SafeBite_Broadcast_0530" /F
  schtasks /Delete /TN "SafeBite_Broadcast_1330" /F
  ```
- `.env.local` / `scripts/.env` に各種APIキーが残っているため、不要なら削除

---

## 補足

- 失効後は第三者が `saferbite.org` を取得可能になる。
- 終了告知の日付を前倒し／後ろ倒ししたい場合は
  `app/_components/ClosureNotice.tsx` の `NOTICE_FROM` を変更して再デプロイする。
