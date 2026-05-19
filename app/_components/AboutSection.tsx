// サーバーコンポーネント — "use client" 不要・静的コンテンツ

export default function AboutSection() {
  return (
    <section className="py-16 px-4 bg-white border-t border-slate-100">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase bg-slate-100 text-slate-600">
          このサービスについて
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
          「知らなかった」で人生を<br />棒に振ってほしくない
        </h2>
        <p className="text-slate-500 text-sm leading-loose mb-8 text-left max-w-lg mx-auto">
          SafeBiteは、闇バイト撲滅を目的とした
          <strong className="text-slate-700">公益・非営利のWebサービス</strong>です。
          <br /><br />
          「手っ取り早く稼ぎたい」という気持ちは、決して悪いことではありません。
          しかし、その気持ちにつけ込む犯罪組織が存在します。
          <br /><br />
          一度関与してしまうと、脅迫・逮捕・前科という取り返しのつかない結果を招きます。
          このサービスは、そうした悪の連鎖に介入するために作られました。
          入力された情報は一切保存されず、広告目的での利用も行いません。
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          {[
            { icon: "🔒", text: "個人情報の収集なし" },
            { icon: "🛡️", text: "公益・非営利目的" },
            { icon: "🤖", text: "AI判定は参考情報" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-slate-600 font-bold text-sm">
              <span>{icon}</span><span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
