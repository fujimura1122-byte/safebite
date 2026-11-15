# SafeBite（saferbite.org）閉鎖手順書

**決定**: 完全閉鎖（ドメインも手放す） — 2026-11-15
**運用期間**: 2026-05-19 〜 2026-11-15（約6ヶ月）

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

## 完了済み（Claude対応分）

- [x] **X自動投稿タスク停止** — SafeBite_Broadcast_0030 / 0530 / 1330 を Disabled（2026-05-26、X凍結時）
- [x] **X監視タスク停止** — SafeBite_Monitor を Disabled（2026-10-21）
- [x] **Redis全データ削除** — 205キーを完全削除、残存0件（2026-11-15）
  - 監視検知投稿200件（X利用者の第三者データ）を消去
  - お問い合わせ経由の個人情報は0件だった（元々蓄積なし）
  - 実績カウンターのみ上記JSONに退避してから削除

---

## オーナー作業チェックリスト

**推奨順序**（上から順に実施。順序を守るとエラー通知が出にくい）

### 1. Cloudflare — ドメイン自動更新をOFF
- https://dash.cloudflare.com → アカウント選択 → **Domain Registration** → **Manage Domains**
- `saferbite.org` → **Auto-Renew** をオフ
- **電話連絡は不要**（管理画面のトグルのみ。オランダ系プロバイダの「電話で解約」はsaferbite.orgとは無関係の別契約）
- 有効期限 **2027-05-19** までは保持され、以降失効

### 2. Cloudflare — Email Routing を無効化
- 同ダッシュボード → saferbite.org → **Email** → Email Routing を Disable
- これで `contact@saferbite.org` の受信が停止

### 3. Vercel — プロジェクト削除
- https://vercel.com/fujimura1122-bytes-projects/safebite → Settings → 最下部 **Delete Project**
- 削除後、サイトは表示されなくなる

### 4. Upstash — Redisデータベース削除
- データは既に空だが、課金停止のためDB自体を削除

### 5. アフィリエイト — 提携解除・退会
- **A8.net**（https://pub.a8.net）— 債務整理・ノートンの提携解除 → 退会
- **バリューコマース**（アルバイトEX）— 提携解除 → 退会
- ※ 未確定の成果報酬がある場合は入金後に退会すること

### 6. Resend — APIキー削除・退会
- https://resend.com/dashboard → APIキー削除 → アカウント削除

### 7. SNSアカウント
- **TikTok @safebite_jp** — 削除 or 放置
- **X @bite_safe** — 凍結中。異議申し立てを取り下げて放置でよい

### 8. 計測ツール（任意）
- **GA4**（G-38B60QXS6D）— プロパティ削除
- **Google Search Console** — プロパティ削除

### 9. GitHub（任意）
- https://github.com/fujimura1122-byte/safebite
- Private化 または Archive（コードを記録として残す場合）

### 10. ローカル環境
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

- **ドメインは2027-05-19まで有効**。Vercelを削除するとその間アクセスしてもエラー表示になる。気になる場合のみ、1枚の案内ページ（公的窓口への誘導）に差し替える選択肢もある。
- 失効後は第三者が `saferbite.org` を取得可能になる。
