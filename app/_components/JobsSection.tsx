"use client";
import { sendGA } from "./tracking";
import { VC_ARUBAITO_EX_URL, VC_ARUBAITO_EX_PIXEL } from "./constants";
import SectionTitle from "./SectionTitle";

const jobs = [
  { title: "引越し・軽作業スタッフ", pay: "時給1,500〜2,000円",     style: "日払いOK・週1〜",         tag: "体力系" },
  { title: "フードデリバリー",        pay: "時給換算1,200〜2,500円", style: "完全フレックス・即日振込", tag: "配達"   },
  { title: "コールセンター（受信）",  pay: "時給1,300〜1,800円",     style: "シフト自由・研修あり",     tag: "在宅可" },
  { title: "イベントスタッフ",        pay: "日給12,000〜18,000円",   style: "単発OK・日払い対応多数",   tag: "単発"   },
  { title: "工場・倉庫ピッキング",    pay: "時給1,200〜1,600円",     style: "未経験OK・日払いあり",     tag: "安定"   },
  { title: "飲食店ホールスタッフ",    pay: "時給1,100〜1,500円",     style: "週1〜・シフト融通あり",    tag: "定番"   },
];

export default function JobsSection() {
  return (
    <section id="jobs" className="py-24 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          label="ホワイト求人 — SAFE JOBS"
          title={<>今すぐ安全に<br />稼げる求人</>}
          subtitle="日払い・即日スタート可能な安全な求人をご紹介。闇バイトに頼る必要はありません。"
          dark={false}
          accent="blue"
        />

        {/* アルバイトEX メインCTA */}
        <a
          href={VC_ARUBAITO_EX_URL}
          target="_blank"
          rel="nofollow noopener noreferrer"
          onClick={() => sendGA("affiliate_click", { affiliate: "arubaito_ex", position: "banner" })}
          className="flex items-center justify-between bg-blue-600 hover:bg-blue-500 rounded-2xl p-5 mb-6 transition-all group"
        >
          {VC_ARUBAITO_EX_PIXEL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={VC_ARUBAITO_EX_PIXEL} height={1} width={1} alt="" style={{ display: "none" }} />
          )}
          <div>
            <div className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">
              有名バイトメディア20社を一括比較
            </div>
            <div className="text-lg font-black text-white">アルバイトEXで安全な求人を探す</div>
            <div className="text-xs text-blue-200 mt-1">
              マッハバイト・タウンワーク・シフトワークスなど180万件以上
            </div>
          </div>
          <span className="text-white text-2xl group-hover:translate-x-1 transition-transform">→</span>
        </a>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {jobs.map((j, i) => (
            <div
              key={i}
              className="bg-white hover:bg-blue-50/50 border border-slate-100 hover:border-blue-100 hover:shadow-sm rounded-2xl p-5 transition-all flex flex-col"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-slate-800 leading-tight text-sm">{j.title}</span>
                <span className="text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-md px-2 py-0.5 ml-2 flex-shrink-0">
                  {j.tag}
                </span>
              </div>
              <div className="text-emerald-600 font-black text-sm mb-1">{j.pay}</div>
              <div className="text-xs text-slate-400 mb-4">{j.style}</div>
              <a
                href={VC_ARUBAITO_EX_URL}
                target="_blank"
                rel="nofollow noopener noreferrer"
                onClick={() => sendGA("affiliate_click", { affiliate: "arubaito_ex", position: "card", job: j.title })}
                className="mt-auto text-xs font-bold text-blue-600 hover:text-blue-800 border border-blue-100 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-2 text-center transition-all"
              >
                求人を探す →
              </a>
            </div>
          ))}
        </div>

        {/* 安全な求人の見分け方 */}
        <div className="bg-slate-900 rounded-2xl p-6 mb-6">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
            ✅ 安全な求人を見分ける3つの基準
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: "🏢", title: "運営元が明確", desc: "会社名・住所・電話番号が公開されている。上場企業や大手プラットフォーム掲載の求人はリスクが低い。" },
              { icon: "📋", title: "面接・登録手続きがある", desc: "身元確認・面接なしで即日高収入を謳う求人は危険。正規の仕事は必ず採用プロセスがある。" },
              { icon: "💳", title: "給与が銀行振込", desc: "現金手渡し・暗号資産・ギフト券払いは詐欺の証拠。正規の会社は銀行振込で給与を支払う。" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <div className="text-sm font-bold text-white mb-1">{title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-slate-100 rounded-2xl p-6 text-center">
          <div className="text-sm font-bold text-slate-700 mb-4">他の求人サイトでも探す</div>
          <div className="flex gap-3 justify-center flex-wrap">
            {[
              { label: "求人ボックス", url: "https://xn--pckua2a7gp15o89zb.com/" },
              { label: "ハローワーク", url: "https://www.hellowork.mhlw.go.jp/"  },
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
              >
                {s.label} →
              </a>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center mt-4">
          ※ アルバイトEXは安全な大手求人サービスです。
        </p>
      </div>
    </section>
  );
}
