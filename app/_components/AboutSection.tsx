// サーバーコンポーネント — "use client" 不要・静的コンテンツ
import SectionTitle from "./SectionTitle";

export default function AboutSection() {
  return (
    <section className="bg-slate-950 relative overflow-hidden">
      {/* 背景グリッド */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* メインコンテンツ */}
      <div className="py-24 px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <SectionTitle
            label="このサービスについて — ABOUT"
            title={<>「知らなかった」で<br />人生を棒に振ってほしくない</>}
            dark={true}
            accent="slate"
          />

          <p className="text-slate-400 text-sm leading-loose mb-10 text-left max-w-lg mx-auto">
            SafeBiteは、闇バイト撲滅を目的とした
            <strong className="text-white">公益・非営利のWebサービス</strong>です。
            <br /><br />
            「手っ取り早く稼ぎたい」という気持ちは、決して悪いことではありません。
            しかし、その気持ちにつけ込む犯罪組織が存在します。
            <br /><br />
            一度関与してしまうと、脅迫・逮捕・前科という取り返しのつかない結果を招きます。
            このサービスは、そうした悪の連鎖に介入するために作られました。
            入力された情報は一切保存されず、広告目的での利用も行いません。
          </p>

          <div className="flex flex-wrap gap-8 justify-center mb-16">
            {[
              { icon: "🔒", text: "個人情報の収集なし" },
              { icon: "🛡️", text: "公益・非営利目的" },
              { icon: "🤖", text: "AI判定は参考情報" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── インパクトメッセージ（警視庁ページ末尾スタイル）── */}
      <div className="border-t border-white/5 py-20 px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-slate-500 text-sm mb-6">
            闇バイトは、あなたを使い捨てにする。
          </p>
          <p className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-4">
            「トクリュウ」を<br />
            <span className="relative inline-block">
              <span className="relative z-10 text-red-500">決して許さない、</span>
            </span>
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-red-500">絶対に見逃さない。</span>
            </span>
          </p>
          <p className="text-slate-500 text-sm mt-6">
            安全で、安心できる社会のために ——
          </p>
          <p className="text-white font-black text-xl mt-3 tracking-widest">
            <span className="text-red-500">Safe</span>Bite
          </p>
        </div>
      </div>
    </section>
  );
}
