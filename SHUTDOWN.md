# SafeBite（saferbite.org）閉鎖 進捗と残タスク

**最終更新**: 2026-11-15

| | |
|---|---|
| 方針 | 完全閉鎖（ドメインも手放す） |
| 運用開始 | 2026-05-19 |
| **サービス終了日** | **2027-05-19**（ドメイン自然失効） |
| 終了告知の表示開始 | 2027-03-19（自動） |

---

## 📊 現在の状態（2026-11-15 実機確認）

| 項目 | 状態 |
|---|---|
| サイト | 🟢 **稼働中**（HTTP 200・通常どおり利用可能） |
| ドメイン | 🟢 有効／**自動更新OFF済み** → 2027-05-19 失効 |
| メール受信 | 🟢 **受信可能**（MXレコード3件・`contact@saferbite.org`） |
| Redis | ✅ **空**（残存0キー） |
| スケジューラ | ✅ **4タスクすべて無効** |
| 終了告知バナー | ✅ 実装・デプロイ済み（2027-03-19に自動表示） |

> **いま行動は不要。** 維持コストは実質ゼロ（従量課金はAnthropic APIのみ、累計50件）。

---

## ✅ 完了済み

- [x] X自動投稿タスク停止（Broadcast 0030/0530/1330）— 2026-05-26
- [x] X監視タスク停止（SafeBite_Monitor）— 2026-10-21
- [x] Redis全データ削除（205キー→0件）— 2026-11-15
  - 監視検知投稿200件（X利用者の第三者データ）を消去
  - 問い合わせ経由の個人情報は元々0件
  - 実績カウンターのみ `Documents\safebite-最終実績記録.json` に退避
- [x] ドメイン自動更新OFF（Cloudflare・再読込で保持を確認）— 2026-11-15
  - 同アカウントの `manseki.app` は変更していない
- [x] 終了告知バナー実装（`app/_components/ClosureNotice.tsx`）— 2026-11-15
- [x] Gemini APIキー削除（プロジェクト「SafeBite」のみ）— 2026-11-15
  - 別プロジェクト "Short video creation" / "TradingBot" のキーは保持
- [x] xAI APIキー削除（SafeBiteチーム・残0件）— 2026-11-15
- [x] GitHub の秘密情報混入チェック — 問題なし（`.gitignore`で`.env*`除外、履歴にも混入なし）

---

# 📋 残タスク

## 🅰 いつでもよい（課金・リスクなし／完全に任意）

- [ ] **GitHubリポジトリの扱いを決める**
  現在 **Public**。秘密情報の混入はなし（確認済み）なので緊急性なし。
  非公開にしたければ Private化 または Archive。
  → https://github.com/fujimura1122-byte/safebite → Settings
- [ ] **GA4プロパティ削除**（G-38B60QXS6D）→ https://analytics.google.com
- [ ] **Search Consoleプロパティ削除** → https://search.google.com/search-console
- [ ] **TikTok @safebite_jp** — 削除 or 放置
- [ ] **X @bite_safe** — 凍結中。異議申し立てを取り下げ or 放置
- [ ] **X APIキー4本の削除** — 現状ポータルに到達不可（詳細は末尾の注記）

## 🅱 お金が絡む（早めの確認を推奨）

- [ ] **A8.net** https://pub.a8.net
  未確定・未入金の成果報酬がないか確認 →（あれば入金後に）提携解除 → 退会
- [ ] **バリューコマース**（アルバイトEX）
  同上。成果はゼロ実績のため、おそらく残高なし

## 🅲 2027年5月（終了直前）— ⚠️ 順序厳守・それまで実行しないこと

> 先に実行するとサイトが消える／問い合わせが黙って壊れます。

- [ ] **1. Cloudflare — Email Routing を無効化**
  dash.cloudflare.com → saferbite.org → Email → Disable
  → `contact@saferbite.org` の受信が停止
- [ ] **2. Vercel — プロジェクト削除**
  https://vercel.com/fujimura1122-bytes-projects/safebite → Settings → Delete Project
  → **これでサイトが消えます**
- [ ] **3. Upstash — Redisデータベース削除**（データは既に空。課金停止のため）
- [ ] **4. Resend — APIキー削除 → アカウント削除**
- [ ] **5. Google OAuthクライアント削除**（Google Cloud Console・`/dev`ログイン用）
- [ ] **6. ローカル: スケジューラタスク4本を削除**
  ```powershell
  schtasks /Delete /TN "SafeBite_Monitor" /F
  schtasks /Delete /TN "SafeBite_Broadcast_0030" /F
  schtasks /Delete /TN "SafeBite_Broadcast_0530" /F
  schtasks /Delete /TN "SafeBite_Broadcast_1330" /F
  ```
- [ ] **7. ローカル: `.env.local` / `scripts/.env` を削除**（APIキーが残っているため）

## 🅳 自動で起こること（作業不要）

- **2027-03-19** 終了告知バナーが全ページに自動表示（公的窓口へ誘導）
- **2027-05-19** ドメインが自動失効。以後サイトは表示されなくなる

---

## 📌 注記

### X APIキーを削除できていない理由
`developer.x.com` は `console.x.com/onboarding` に転送され、**新しい開発者
プログラムへの新規登録フォーム**（アカウント名入力・PPUパイロット契約への
同意）が表示される。既存アプリの管理画面に到達できない。
これは「キー削除」ではなく「新規の規約同意とアカウント作成」のため未実行。

**実務上の判断**: @bite_safe は凍結済みで、X ではアカウント凍結時に紐づく
開発者アプリのAPIアクセスも停止されるのが通常。**キーは既に機能していない
可能性が高く**、放置によるリスクは低い。

### 失効後について
2027-05-19 以降、`saferbite.org` は第三者が取得可能になる。

### 告知日を変更したい場合
`app/_components/ClosureNotice.tsx` の `NOTICE_FROM` を書き換えて再デプロイ。

### 最終実績（記録）
AIチェッカー利用 50 ／ 通報文生成 117 ／ IHC通報確認 109 ／ SOSテンプレ 1
／ 闇バイト検知投稿 200（削除済み）
詳細: `C:\Users\Atsushi Fujimura\Documents\safebite-最終実績記録.json`
