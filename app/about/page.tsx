import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営者情報・このサービスについて | SafeBite",
  description: "SafeBiteは闇バイト被害の未然防止を目的とした公益・非営利のWebサービスです。ミッション・活動実績・運営方針をご紹介します。",
};

export default function AboutPage() {
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
            <Link href="/contact" className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
              お問い合わせ
            </Link>
            <Link href="/" className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
              ← トップに戻る
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-14 bg-white min-h-screen">

        {/* ヒーロー */}
        <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 py-20 px-4 border-b border-slate-100">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">About SafeBite</p>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
              「知らなかった」で<br />
              <span className="text-blue-600">人生を棒に振ってほしくない。</span>
            </h1>
            <p className="text-slate-600 text-base leading-relaxed max-w-xl mx-auto">
              SafeBiteは、闇バイト被害の未然防止を目的とした<strong className="text-slate-900">公益・非営利のWebサービス</strong>です。
              AIを活用した危険度チェック・通報支援・SOS相談テンプレ生成を、すべて無料で提供しています。
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-16 space-y-16">

          {/* ミッション */}
          <section>
            <SectionHeading label="Mission" title="ミッション" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: "🔍",
                  title: "気づかせる",
                  desc: "「これって闇バイトかも？」という疑問を、AIが0.5秒で判定。求人文をコピペするだけで危険度がわかります。",
                },
                {
                  icon: "🚨",
                  title: "行動につなげる",
                  desc: "疑わしい投稿を見つけたら、IHC・警察庁への通報文をAIが自動生成。市民の力で闇バイトを撲滅します。",
                },
                {
                  icon: "🆘",
                  title: "逃げ道を示す",
                  desc: "すでに関わってしまった人にも、警察・弁護士への相談テンプレを提供。「まだ間に合う」を伝えます。",
                },
              ].map((item) => (
                <div key={item.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* なぜ作ったか */}
          <section>
            <SectionHeading label="Background" title="このサービスを作った理由" />
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
              <p className="text-slate-700 leading-loose text-sm">
                「手っ取り早く稼ぎたい」という気持ちは、決して悪いことではありません。
                アルバイト代が欲しい、奨学金を返したい、家族を助けたい——そんな切実な動機につけ込む犯罪組織が存在します。
              </p>
              <p className="text-slate-700 leading-loose text-sm mt-4">
                闇バイトの最大の特徴は、<strong className="text-slate-900">「普通のアルバイト募集」に見える</strong>ことです。
                「UD」「ホワ案」「受け子」といった業界用語は、知らなければ判別できません。
                SNSでは今この瞬間も、数十万人の若者に向けて勧誘が行われています。
              </p>
              <p className="text-slate-700 leading-loose text-sm mt-4">
                一度関与してしまうと、脅迫・逮捕・前科という取り返しのつかない結果を招きます。
                SafeBiteは「知識と情報で、被害が起きる前に介入する」ために生まれました。
              </p>
            </div>
          </section>

          {/* 活動実績 */}
          <section>
            <SectionHeading label="Impact" title="活動実績・提供機能" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: "🤖",
                  title: "AI危険度チェッカー",
                  desc: "求人文・DMのテキストをコピペするだけで、AIが危険度をスコアで即判定。検知キーワードと理由も表示します。",
                  tag: "機能①",
                },
                {
                  icon: "🚨",
                  title: "市民通報ハブ",
                  desc: "怪しい投稿のURLを貼るだけで通報文を自動生成。IHC（警察庁委託機関）・都道府県警察への提出を支援します。",
                  tag: "機能②",
                },
                {
                  icon: "🆘",
                  title: "駆け込みSOS",
                  desc: "4問に答えるだけで、警察・法テラスに持参できる相談テンプレを自動生成。今からでも間に合います。",
                  tag: "機能③",
                },
                {
                  icon: "💼",
                  title: "安全な求人紹介",
                  desc: "大手求人プラットフォームへの導線を提供。危険な求人の代わりに、安全に稼げる選択肢を示します。",
                  tag: "機能④",
                },
                {
                  icon: "📖",
                  title: "闇バイト隠語辞典",
                  desc: "「UD」「受け子」「ホワ案」など、闇バイトで使われる隠語・用語を11語以上解説。",
                  tag: "コンテンツ",
                },
                {
                  icon: "📰",
                  title: "闇バイト関連ニュース",
                  desc: "実際の逮捕事例をリアルタイムで表示。「他人事ではない」という認識を促します。",
                  tag: "コンテンツ",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex gap-4">
                  <div className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-black text-slate-900">{item.title}</span>
                      <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 rounded px-1.5 py-0.5 font-bold">{item.tag}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 運営方針 */}
          <section>
            <SectionHeading label="Policy" title="運営方針" />
            <div className="space-y-3">
              {[
                {
                  icon: "🔒",
                  title: "完全匿名・入力情報の非保存",
                  desc: "AIチェッカーに入力されたテキストは、判定処理後に即時廃棄されます。個人情報の収集・販売は一切行いません。",
                },
                {
                  icon: "🛡️",
                  title: "公益・非営利目的での運営",
                  desc: "当サービスは利益追求を目的としません。サイト内の一部リンクはアフィリエイト（成果報酬）を使用していますが、これは運営費用の補填目的であり、コンテンツの中立性に影響しません。",
                },
                {
                  icon: "⚖️",
                  title: "法的機関との連携重視",
                  desc: "IHC（インターネット・ホットラインセンター）・都道府県警察・法テラスなど、公的機関への通報・相談を積極的に支援します。当サービス独自の「解決」を謳いません。",
                },
                {
                  icon: "🤖",
                  title: "AIは参考情報",
                  desc: "AI判定は参考情報であり、法的根拠を保証するものではありません。最終的な判断は公的機関にご相談ください。",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-bold text-slate-900 text-sm mb-1">{item.title}</div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 運営者情報 */}
          <section>
            <SectionHeading label="Operator" title="運営者情報" />
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "運営主体", value: "SafeBite Project" },
                    { label: "サービス名", value: "SafeBite" },
                    { label: "サービスURL", value: "https://saferbite.org" },
                    { label: "設立目的", value: "インターネット上の闇バイト被害の未然防止および市民による通報活動の支援" },
                    { label: "運営形態", value: "公益・非営利（個人運営）" },
                    { label: "お問い合わせ", value: "お問い合わせフォームよりご連絡ください" },
                  ].map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-5 py-3.5 font-bold text-slate-700 w-1/3 border-b border-slate-100">{row.label}</td>
                      <td className="px-5 py-3.5 text-slate-600 border-b border-slate-100">
                        {row.label === "お問い合わせ" ? (
                          <Link href="/contact" className="text-blue-600 hover:underline">{row.value}</Link>
                        ) : row.label === "サービスURL" ? (
                          <a href={row.value} className="text-blue-600 hover:underline">{row.value}</a>
                        ) : row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
            <h2 className="text-xl font-black mb-2">今すぐ危険なバイト募集をチェック</h2>
            <p className="text-blue-100 text-sm mb-6">求人文をコピペするだけ。無料・匿名・入力情報は保存なし</p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-700 font-black px-8 py-3 rounded-xl hover:bg-blue-50 transition-all text-sm"
            >
              SafeBiteを使う →
            </Link>
          </section>

        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{label}</p>
      <h2 className="text-2xl font-black text-slate-900">{title}</h2>
    </div>
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
