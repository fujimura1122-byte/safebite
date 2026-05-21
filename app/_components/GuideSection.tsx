// サーバーコンポーネント — "use client" なし
import Link from "next/link";

const GUIDES = [
  {
    href: "/guide/kotowarikata",
    emoji: "🚪",
    tag: "断る・逃げる",
    tagColor: "bg-red-50 text-red-600 border-red-100",
    title: "闇バイトの断り方・辞め方",
    desc: "まだ応募していない段階から仕事を始めてしまった段階まで、状況別の具体的な手順",
    cta: "断り方を確認する →",
    accent: "border-red-200 hover:border-red-400",
    ctaColor: "text-red-600 group-hover:text-red-500",
  },
  {
    href: "/guide/higai-soudan",
    emoji: "🆘",
    tag: "被害・緊急対処",
    tagColor: "bg-orange-50 text-orange-600 border-orange-100",
    title: "被害に遭ったらやること",
    desc: "個人情報を送った・脅された・仕事をしてしまった場合の4ステップと無料相談窓口",
    cta: "対処法を見る →",
    accent: "border-orange-200 hover:border-orange-400",
    ctaColor: "text-orange-600 group-hover:text-orange-500",
  },
  {
    href: "/guide/hogosha",
    emoji: "👨‍👩‍👧",
    tag: "保護者・学校向け",
    tagColor: "bg-blue-50 text-blue-600 border-blue-100",
    title: "保護者・学校向けガイド",
    desc: "危険なサイン8項目・SNS勧誘パターン・子どもへの声かけ方・学校でできる対策",
    cta: "保護者向けを見る →",
    accent: "border-blue-200 hover:border-blue-400",
    ctaColor: "text-blue-600 group-hover:text-blue-500",
  },
  {
    href: "/guide/taiho-jirei",
    emoji: "⚖️",
    tag: "逮捕・判決事例",
    tagColor: "bg-slate-100 text-slate-600 border-slate-200",
    title: "逮捕・判決事例まとめ",
    desc: "「知らなかった」「1回だけ」が通用しない理由——実際の逮捕事例6件と役割別罰則表",
    cta: "事例を確認する →",
    accent: "border-slate-200 hover:border-slate-400",
    ctaColor: "text-slate-600 group-hover:text-slate-900",
  },
];

export default function GuideSection() {
  return (
    <section id="guide" className="py-20 px-4 bg-slate-50">
      <div className="max-w-3xl mx-auto">

        {/* ヘッダー */}
        <div className="text-center mb-10">
          <div className="inline-block bg-white border border-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
            知識ガイド
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
            闇バイトから身を守る<br className="sm:hidden" />ガイド
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            「断り方がわからない」「もう関わってしまった」「子どもが心配」——<br />
            状況別に<strong className="text-slate-800">具体的な対処法</strong>をまとめました。
          </p>
        </div>

        {/* ガイドカード グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className={`group bg-white border-2 ${g.accent} rounded-2xl p-6 flex flex-col gap-3 transition-all duration-200 hover:shadow-md`}
            >
              {/* アイコン＋タグ */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{g.emoji}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${g.tagColor}`}>
                  {g.tag}
                </span>
              </div>

              {/* タイトル */}
              <h3 className="text-base font-black text-slate-900 leading-snug">
                {g.title}
              </h3>

              {/* 説明 */}
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                {g.desc}
              </p>

              {/* CTA */}
              <div className={`text-xs font-black ${g.ctaColor} transition-colors`}>
                {g.cta}
              </div>
            </Link>
          ))}
        </div>

        {/* 緊急 #9110 バナー */}
        <div className="bg-red-600 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex-1">
            <p className="text-white font-black text-base mb-1">
              今すぐ助けが必要な方へ
            </p>
            <p className="text-red-100 text-xs leading-relaxed">
              警察安全相談電話は24時間対応・匿名OK。相談するだけでは逮捕されません。
            </p>
          </div>
          <a
            href="tel:9110"
            className="flex-shrink-0 bg-white text-red-600 font-black text-2xl px-8 py-3 rounded-xl tracking-widest hover:bg-red-50 transition-all"
          >
            #9110
          </a>
        </div>

      </div>
    </section>
  );
}
