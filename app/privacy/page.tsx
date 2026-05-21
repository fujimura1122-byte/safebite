import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | SafeBite",
  description: "SafeBiteのプライバシーポリシー。個人情報の取り扱い、Cookie・アクセス解析、アフィリエイトに関する方針を記載しています。",
};

const LAST_UPDATED = "2026年5月18日";

export default function PrivacyPage() {
  return (
    <>
      {/* ナビ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-lg tracking-tight">
            <span className="text-blue-600">Safe</span>
            <span className="text-slate-900">Bite</span>
          </Link>
          <div className="flex items-center gap-1 text-xs font-bold">
            <Link href="/" className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
              ← トップに戻る
            </Link>
          </div>
        </div>
      </nav>

      {/* 本文 */}
      <main className="pt-14 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-16">

          {/* ヘッダー */}
          <div className="mb-12">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Legal</p>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">プライバシーポリシー</h1>
            <p className="text-sm text-slate-500">最終更新日：{LAST_UPDATED}</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-10 text-sm leading-relaxed text-slate-700">

            {/* イントロ */}
            <p>
              SafeBite Project（以下「当サービス」）は、闇バイト被害の未然防止を目的とした公益Webサービス
              「SafeBite」（<a href="https://saferbite.org" className="text-blue-600 hover:underline">https://saferbite.org</a>）
              を運営しています。本プライバシーポリシーは、当サービスにおける情報の取り扱いについて説明するものです。
            </p>

            <Section title="1. 収集する情報について">
              <p>当サービスは、ユーザーの個人情報（氏名・住所・電話番号・メールアドレス等）を収集・保存しません。</p>
              <p className="mt-3">お問い合わせフォームからご連絡いただいた場合、ご入力いただいたメールアドレス・お名前・お問い合わせ内容を返信目的のみに使用し、第三者へ提供しません。</p>
            </Section>

            <Section title="2. AI判定への入力テキストについて">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="font-bold text-blue-900 mb-1">入力内容はサーバーに一切保存されません</p>
                <p className="text-blue-800">
                  AI危険度チェッカー・通報文ジェネレーター・SOS相談テンプレ生成において入力されたテキストは、
                  AIによる判定処理のためのみに使用され、当サービスのサーバーにログ・データベースとして保存されることはありません。
                  判定処理完了後、入力データは即時廃棄されます。
                </p>
              </div>
            </Section>

            <Section title="3. アクセス解析ツール（Google アナリティクス）">
              <p>
                当サービスでは、サービス改善を目的としてGoogleが提供するアクセス解析ツール
                「Google アナリティクス 4（GA4）」を使用しています。
              </p>
              <p className="mt-3">
                Google アナリティクスはトラフィックデータの収集のためにCookieを使用します。
                このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
                収集されるデータには、ページ閲覧数・滞在時間・流入元・デバイス種別等が含まれます。
              </p>
              <p className="mt-3">
                Cookieの使用はブラウザの設定で無効にすることができます。
                Google アナリティクスのデータ収集を無効にしたい場合は、
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mx-1">
                  Google アナリティクス オプトアウトアドオン
                </a>
                をご利用ください。
              </p>
            </Section>

            <Section title="4. 広告・アフィリエイトリンクについて">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-bold text-amber-900 mb-2">広告・プロモーションリンクの掲載について</p>
                <p className="text-amber-800">
                  当サービスでは、運営費用の一部を賄うため、一部のリンクにアフィリエイト（成果報酬型広告）を使用しています。
                  これらのリンクを経由してサービスの申し込み・購入が行われた場合、当サービスに報酬が発生することがあります。
                </p>
              </div>
              <p className="mt-4">
                掲載している広告・提携先（アルバイトEX・弁護士無料相談・セキュリティソフト等）は、
                SafeBiteのミッション（闇バイト被害防止・ユーザーの安全確保）に沿った
                ものとして選定しています。アフィリエイト収入の有無によって、コンテンツの内容や評価が
                変わることはありません。
              </p>
              <p className="mt-3">
                アフィリエイトリンクには <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">rel="nofollow"</code> 属性を付与しています。
              </p>
            </Section>

            <Section title="5. 第三者への情報提供">
              <p>当サービスは、以下の場合を除き、取得した情報を第三者に提供・販売・開示しません。</p>
              <ul className="list-disc list-inside space-y-1 mt-3 ml-2">
                <li>法令に基づき開示が必要な場合</li>
                <li>人の生命・身体・財産の保護のために必要な場合</li>
              </ul>
            </Section>

            <Section title="6. 外部リンクについて">
              <p>
                当サービスから外部サイト（警察庁・IHC・各種相談窓口等）へのリンクを含みますが、
                リンク先のサービスにおける情報取り扱いについては、各サービスのプライバシーポリシーをご確認ください。
                当サービスは、外部サービスの情報取り扱いに関して責任を負いません。
              </p>
            </Section>

            <Section title="7. 免責事項">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>当サービスのAI判定結果は参考情報であり、法的根拠を保証するものではありません。</li>
                <li>当サービスの利用により生じたいかなる損害についても、当サービスは責任を負いません。</li>
                <li>掲載情報の正確性には努めていますが、完全性・最新性を保証するものではありません。</li>
              </ul>
            </Section>

            <Section title="8. プライバシーポリシーの変更">
              <p>
                本ポリシーは、法令の改正やサービス内容の変更に伴い、予告なく改定することがあります。
                改定後のポリシーは本ページに掲載した時点で効力を生じるものとします。
              </p>
            </Section>

            <Section title="9. お問い合わせ">
              <p>
                本ポリシーに関するお問い合わせは、
                <Link href="/contact" className="text-blue-600 hover:underline mx-1">お問い合わせフォーム</Link>
                よりご連絡ください。
              </p>
              <p className="mt-2 text-slate-500">運営主体：SafeBite Project</p>
            </Section>

          </div>
        </div>
      </main>

      {/* フッター */}
      <SiteFooter />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-black text-slate-900 mb-3 pb-2 border-b border-slate-100">{title}</h2>
      {children}
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-500 py-10 px-4 text-xs">
      <div className="max-w-2xl mx-auto text-center">
        <div className="font-black text-base mb-4">
          <span className="text-blue-400">Safe</span>
          <span className="text-white">Bite</span>
        </div>
        <div className="flex gap-4 justify-center mb-4 flex-wrap">
          <Link href="/" className="hover:text-slate-300 transition-colors">ホーム</Link>
          <Link href="/glossary" className="hover:text-slate-300 transition-colors">隠語辞典</Link>
          <Link href="/about" className="hover:text-slate-300 transition-colors">運営者情報</Link>
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">プライバシーポリシー</Link>
          <Link href="/contact" className="hover:text-slate-300 transition-colors">お問い合わせ</Link>
        </div>
        <p className="text-slate-600">© 2026 SafeBite Project — すべての人が安全に働ける社会のために</p>
      </div>
    </footer>
  );
}
