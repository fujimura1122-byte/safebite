# SafeBite 運用マニュアル

## 日常運用チェックリスト

### 毎日確認
- [ ] `/dev` ダッシュボードを開いてメール受信箱を確認
- [ ] X監視（MonitorSection）で新着の闇バイト投稿をチェック
- [ ] TikTok投稿スケジュールを確認

### 週次確認
- [ ] GA4でアクティブユーザー数・流入元を確認
- [ ] Google Search Console で検索パフォーマンスを確認
- [ ] Vercel のデプロイログでエラーがないか確認

---

## /dev ダッシュボード

**URL**: https://saferbite.org/dev
**ログイン**: Google OAuth（`ALLOWED_DEV_EMAIL` に設定されたアカウントのみ）

### 主要セクション
| セクション | 機能 |
|------------|------|
| Overall Progress | タスク完了率バー |
| System Status | インフラ稼働状況 |
| Task Board | P1〜P5 タスク管理 |
| Email | contact@saferbite.org 受信・送信 |
| Monitor | X闇バイト検知投稿管理 |
| Roadmap | 今後の計画 |
| Quick Links | 各種管理画面へのリンク |

### タスク更新方法
`app/dev/tasks.ts` の該当タスクを編集してコミット・プッシュ。

```typescript
// 例: タスクを完了にする
{
  id: 22,
  status: "done",      // "todo" | "in-progress" | "done" | "blocked"
  completedAt: "2026-05-26",
}
```

**重要**: 作業完了のたびに必ず tasks.ts と page.tsx（System Status）を更新すること。

---

## メールシステム操作

### 受信確認
1. `/dev` を開く
2. Email セクションの「↻ 更新」を押す
3. 受信メールが一覧表示される

### メール送信
1. 「＋ 新規作成」を押す
2. 宛先・件名・本文を入力
3. 「送信する →」

### 返信
1. メールを開く
2. 「↩ 返信する」を押す
3. 本文を入力して送信

### メール削除
1. メールを開く
2. 「🗑 削除」→ 確認ダイアログ → 「削除する」

### お問い合わせフォームからの受信
`saferbite.org/contact` からの問い合わせは自動的に受信箱に届く。
件名形式: `[お問い合わせ] {種別} — {名前}`

---

## X（Twitter）自動投稿

### 現状
アカウント @bite_safe が凍結中（2026-05-26）。
異議申し立て済み（help.twitter.com/forms/general）。

### 再開手順（凍結解除後）
1. タスクスケジューラーを開く（Win+R → `taskschd.msc`）
2. 以下の3タスクを右クリック → 有効化
   - SafeBite_Broadcast_0030
   - SafeBite_Broadcast_0530
   - SafeBite_Broadcast_1330
3. アカウント名から「公式」を削除
4. 投稿頻度を確認（3回/日 → 問題なければ維持）

### スクリプト場所
```
C:\Users\Atsushi Fujimura\Documents\safebite\scripts\x_broadcast.py
C:\Users\Atsushi Fujimura\Documents\safebite\scripts\run_broadcast.bat
```

---

## Cloudflare Email Worker

### 再デプロイが必要な場合
```powershell
cd "C:\Users\Atsushi Fujimura\Documents\safebite\scripts\cloudflare-email-worker"
npx wrangler login   # トークン期限切れの場合のみ
npx wrangler deploy
```

### シークレット再設定（BOM対策必須）
```powershell
$OutputEncoding = [System.Text.Encoding]::ASCII
"safebite-email-inbound-18716" | npx wrangler secret put EMAIL_INBOUND_SECRET --name safebite-email-worker
```

### メール受信のデバッグ
```powershell
cd "C:\Users\Atsushi Fujimura\Documents\safebite\scripts\cloudflare-email-worker"
npx wrangler tail safebite-email-worker --format pretty
```
（別ウィンドウで実行したまま test@example.com から contact@saferbite.org にメール送信）

---

## Vercel 環境変数の更新

```powershell
cd "C:\Users\Atsushi Fujimura\Documents\safebite"

# 一覧確認
npx vercel env ls

# 追加（BOM対策: $OutputEncodingを先に設定）
$OutputEncoding = [System.Text.Encoding]::ASCII
"new_value" | npx vercel env add VARIABLE_NAME production

# 削除してから再追加
npx vercel env rm VARIABLE_NAME production --yes
"new_value" | npx vercel env add VARIABLE_NAME production
```

変更後は git push で Vercel が再デプロイし、新しい値が反映される。

---

## デプロイ

```powershell
cd "C:\Users\Atsushi Fujimura\Documents\safebite"
git add <変更ファイル>
git commit -m "変更内容の説明"
git push origin main
```

Vercel が GitHub 連携で自動デプロイ（約1〜2分）。

---

## GA4 確認方法

1. https://analytics.google.com を開く
2. プロパティ「safebite」を選択
3. レポート → エンゲージメント → イベント

### 重要なキーイベント
- `ai_check`: チェッカー利用回数（最重要KPI）
- `contact_submitted`: 問い合わせ件数
- `checker_started`: チェック開始回数

---

## Google Search Console

**注意**: 現在 `saferbite-zeta.vercel.app` が誤登録されている。
正しい手順:
1. Search Console → 「プロパティを追加」
2. ドメイン → `saferbite.org` を入力
3. 表示されるTXTレコードを Cloudflare DNS に追加
4. 確認後、sitemap を送信: `https://saferbite.org/sitemap.xml`

---

## TikTok 投稿ワークフロー

### 現在の状況
- アカウント: @safebite_jp
- 投稿済み: 2/10本

### 投稿の流れ
1. `docs/OPERATIONS.md` の台本セクションを参照（または新規作成）
2. CapCut でテキスト・AI音声・BGMを編集（約20分/本）
3. TikTok にアップロード
4. 説明文とハッシュタグを設定
5. `app/dev/tasks.ts` のTask #22を更新
6. git push

### 推奨ハッシュタグ
```
#闇バイト #詐欺注意 #社会問題 #身を守る #高校生 #大学生 #バイト探し #安全 #知識 #注意喚起
```

### 説明文テンプレート
```
🚨[動画の一言説明]
[ポイントを1〜2行]

詳しくはプロフィールのリンクから👇
saferbite.org

#闇バイト #詐欺注意 ...
```

---

## トラブルシューティング

### /dev にアクセスできない
→ `saferbite.org/dev/login` でGoogleログイン（`ALLOWED_DEV_EMAIL` のアカウント）

### メール受信箱に「Failed to fetch」が出る
→ セッション切れの可能性。`/dev/login` で再ログイン

### メールが受信箱に届かない
1. Cloudflare Email Routing の Overview で Dropped 数を確認
2. `npx wrangler tail safebite-email-worker` でログを確認
3. `POST /api/email/inbound` を直接テスト:
   ```powershell
   $body = '{"from":"test@test.com","to":"contact@saferbite.org","subject":"テスト","textBody":"テスト本文"}' 
   Invoke-WebRequest -Uri "https://saferbite.org/api/email/inbound" -Method POST -Headers @{"Content-Type"="application/json";"Authorization"="Bearer safebite-email-inbound-18716"} -Body $body
   ```

### Wrangler 認証エラー（Invalid access token）
→ `npx wrangler login` で再認証

### Vercel デプロイが失敗する
→ `npx vercel logs` でエラーを確認。型エラーが多い場合は `npx tsc --noEmit` でローカル確認

---

## 重要なURL一覧

| サービス | URL |
|---------|-----|
| 本番サイト | https://saferbite.org |
| 管理画面 | https://saferbite.org/dev |
| Vercel | https://vercel.com/fujimura1122-bytes-projects/safebite |
| Cloudflare | https://dash.cloudflare.com（saferbite.org） |
| GA4 | https://analytics.google.com |
| Search Console | https://search.google.com/search-console |
| GitHub | https://github.com/fujimura1122-byte/safebite |
| TikTok | https://www.tiktok.com/@safebite_jp |
| X（凍結中） | https://x.com/bite_safe |
| Resend | https://resend.com/dashboard |
| A8.net | https://pub.a8.net |

---

## 現在のタスク優先順位（2026-05-26時点）

1. **TikTok 残り8本投稿**（最優先・X凍結の穴を埋める）
2. **Google Search Console に saferbite.org を正しく登録**
3. **X 異議申し立ての返答を待つ**（待つだけ）
4. Instagram 開設（TikTok動画を流用、コスト低）
5. PR Times プレスリリース（TikTok10本完成後）
