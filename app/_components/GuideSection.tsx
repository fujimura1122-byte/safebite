// サーバーコンポーネント — "use client" なし
import Link from "next/link";
import SectionTitle from "./SectionTitle";

const GUIDES = [
  {
    href: "/guide/kotowarikata",
    emoji: "🚪",
    tag: "断る・逃げる",
    tagColor: "bg-red-500/20 text-red-300 border-red-500/20",
    title: "闇バイトの断り方・辞め方",
    desc: "まだ応募していない段階から仕事を始めてしまった段階まで、状況別の具体的な手順",
    cta: "断り方を確認する →",
    accent: "border-red-500/20 hover:border-red-500/50 hover:bg-white/5",
    ctaColor: "text-red-400 group-hover:text-red-300",
  },
  {
    href: "/guide/higai-soudan",
    emoji: "🆘",
    tag: "被害・緊急対処",
    tagColor: "bg-orange-500/20 text-orange-300 border-orange-500/20",
    title: "被害に遭ったらやること",
    desc: "個人情報を送った・脅された・仕事をしてしまった場合の4ステップと無料相談窓口",
    cta: "対処法を見る →",
    accent: "border-orange-500/20 hover:border-orange-500/50 hover:bg-white/5",
    ctaColor: "text-orange-400 group-hover:text-orange-300",
  },
  {
    href: "/guide/hogosha",
    emoji: "👨‍👩‍👧",
    tag: "保護者・学校向け",
    tagColor: "bg-blue-500/20 text-blue-300 border-blue-500/20",
    title: "保護者・学校向けガイド",
    desc: "危険なサイン8項目・SNS勧誘パターン・子どもへの声かけ方・学校でできる対策",
    cta: "保護者向けを見る →",
    accent: "border-blue-500/20 hover:border-blue-500/50 hover:bg-white/5",
    ctaColor: "text-blue-400 group-hover:text-blue-300",
  },
  {
    href: "/guide/taiho-jirei",
    emoji: "⚖️",
    tag: "逮捕・判決事例",
    tagColor: "bg-white/10 text-slate-300 border-white/10",
    title: "逮捕・判決事例まとめ",
    desc: "「知らなかった」「1回だけ」が通用しない理由——実際の逮捕事例6件と役割別罰則表",
    cta: "事例を確認する →",
    accent: "border-white/10 hover:border-white/30 hover:bg-white/5",
    ctaColor: "text-slate-400 group-hover:text-slate-200",
  },
];

export default function GuideSection() {
  return (
    <section id="guide" className="py-24 px-4 bg-slate-950 relative overflow-hidden">
      {/* 背景グリッド */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <SectionTitle
          label="知識ガイド — SAFETY GUIDE"
          title={<>闇バイトから<br />身を守るガイド</>}
          subtitle={`「断り方がわからない」「もう関わってしまった」「子どもが心配」——\n状況別に具体的な対処法をまとめました。`}
          dark={true}
          accent="red"
        />

        {/* ガイドカード グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className={`group bg-white/5 border ${g.accent} rounded-2xl p-6 flex flex-col gap-3 transition-all duration-200`}
            >
              {/* アイコン＋タグ */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{g.emoji}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${g.tagColor}`}>
                  {g.tag}
                </span>
              </div>

              {/* タイトル */}
              <h3 className="text-base font-black text-white leading-snug">
                {g.title}
              </h3>

              {/* 説明 */}
              <p className="text-xs text-slate-400 leading-relaxed flex-1">
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
        <div className="bg-red-600 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex-1">
            <p className="text-white font-black text-lg mb-1">
              今すぐ助けが必要な方へ
            </p>
            <p className="text-red-100 text-sm leading-relaxed">
              警察安全相談電話は24時間対応・匿名OK。<br />
              相談するだけでは逮捕されません。一人で抱え込まないでください。
            </p>
          </div>
          <a
            href="tel:9110"
            className="flex-shrink-0 bg-white text-red-600 font-black text-3xl px-10 py-4 rounded-xl tracking-widest hover:bg-red-50 transition-all"
          >
            #9110
          </a>
        </div>

      </div>
    </section>
  );
}
