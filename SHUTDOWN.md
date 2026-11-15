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

## 📋 関連サービス完全一覧（2026-11-15 棚卸し）

### ❌ 2027年5月まで消さないこと（消すとサイトが止まる）

| サービス | 用途 | 課金 |
|---|---|---|
| **Vercel** | サイトのホスティング | Hobby＝無料 |
| **Upstash Redis** | データストア（現在空） | 無料枠 |
| **Anthropic API** | AIチェッカーの判定 | **従量課金**（利用ごと） |
| **Cloudflare** | ドメイン・DNS・メール転送 | 自動更新OFF済み＝追加費用なし |
| **Resend** | メール送信 | 無料枠 |
| **Google OAuth**（Google Cloud Console） | `/dev` のログイン | 無料 |

→ 実質ほぼ無料で維持できるため、**2027年5月まで放置して問題ない**。
→ 唯一の従量課金は Anthropic API だが、6ヶ月の累計利用が50件のため影響は軽微。
   APIルートにはレートリミットがあり、濫用による高額化も抑制されている。

### ✅ 今すぐ失効させてよい（停止済みで、もう使っていない）

スクリプトは全て停止済みなので、以下のキーは失効させても何も壊れない。
生きたまま放置するより、消す方が安全。

| キー（`scripts/.env`） | 発行元 | 現状 |
|---|---|---|
| `X_API_KEY` / `X_API_SECRET` / `X_ACCESS_TOKEN` / `X_ACCESS_TOKEN_SECRET` | X Developer Portal | 自動投稿・監視とも停止済み |
| `GEMINI_API_KEY` | Google AI Studio | 投稿文生成用。停止済み |
| `XAI_API_KEY` | xAI | トレンド取得用。停止済み |
| `MONITOR_SECRET` / `EMAIL_INBOUND_SECRET` | 自前の文字列 | 失効作業は不要 |

### 💰 お金が絡む → 退会前に確認

- **A8.net**（https://pub.a8.net）— 債務整理・ノートンの提携解除 → 退会
- **バリューコマース**（アルバイトEX）— 提携解除 → 退会
- ※ **未確定・未入金の成果報酬があれば、入金後に退会すること**
  （実績としては成果ゼロのため、おそらく残高なし）

### 🟢 消さなくても害はない（好みで判断）

- **GitHub** https://github.com/fujimura1122-byte/safebite
  - **現在 Public**。ただし `.gitignore` で `.env*` を除外済みで、
    git履歴に秘密情報の混入がないことを確認済み（2026-11-15）
  - コードを公開したままにしたくなければ Private化 または Archive
- **GA4**（G-38B60QXS6D）/ **Google Search Console** — プロパティ削除は任意
- **TikTok @safebite_jp** — 削除 or 放置
- **X @bite_safe** — 凍結中。異議申し立てを取り下げて放置でよい

### 🖥 ローカル環境（最後に）

- Windowsタスクスケジューラーから SafeBite_* 4タスクを削除
  ```powershell
  schtasks /Delete /TN "SafeBite_Monitor" /F
  schtasks /Delete /TN "SafeBite_Broadcast_0030" /F
  schtasks /Delete /TN "SafeBite_Broadcast_0530" /F
  schtasks /Delete /TN "SafeBite_Broadcast_1330" /F
  ```
- `.env.local` / `scripts/.env` にAPIキーが残っている。上記の失効作業後に削除

---

## 補足

- 失効後は第三者が `saferbite.org` を取得可能になる。
- 終了告知の日付を前倒し／後ろ倒ししたい場合は
  `app/_components/ClosureNotice.tsx` の `NOTICE_FROM` を変更して再デプロイする。
