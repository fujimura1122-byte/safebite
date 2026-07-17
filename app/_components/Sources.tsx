import Link from "next/link";

// E-E-A-T（信頼性）強化のための出典表示。
// YMYL領域（犯罪・法律・安全）では、公的な一次情報への出典明示が検索評価に直結する。
// 掲載URLは 2026-07 時点で存在（HTTP 200）を確認済み。リンク切れ時は差し替えること。

export type Source = { label: string; url: string; org: string };

// 汎用の一次情報ソース
export const GOV_SOURCES: Record<string, Source> = {
  keihou: {
    label: "刑法（詐欺罪・窃盗罪等）",
    url: "https://laws.e-gov.go.jp/law/140AC0000000045",
    org: "e-Gov法令検索（デジタル庁）",
  },
  npaStats: {
    label: "特殊詐欺の認知・検挙状況等について",
    url: "https://www.npa.go.jp/publications/statistics/sousa/sagi.html",
    org: "警察庁",
  },
  npaTokushu: {
    label: "特殊詐欺対策（有害求人・もうけ話への注意喚起）",
    url: "https://www.npa.go.jp/bureau/sosikihanzai/tokushusagi.html",
    org: "警察庁",
  },
  sos47: {
    label: "SOS47 特殊詐欺対策ページ",
    url: "https://www.npa.go.jp/bureau/safetylife/sos47/circumstances/",
    org: "警察庁",
  },
  cfa: {
    label: "青少年の「闇バイト」への加担を防止するための取組",
    url: "https://www.cfa.go.jp/policies/youth-kankyou/yami-baito",
    org: "こども家庭庁",
  },
  mext: {
    label: "青少年をいわゆる「闇バイト」に加担させないための取組",
    url: "https://www.mext.go.jp/a_menu/sports/ikusei/mext_02920.html",
    org: "文部科学省",
  },
  houterasu: {
    label: "法律相談・費用の立替（法テラス）",
    url: "https://www.houterasu.or.jp/",
    org: "日本司法支援センター",
  },
};

export default function Sources({
  items,
  note,
}: {
  items: Source[];
  note?: string;
}) {
  return (
    <section className="mt-12 border-t border-slate-100 pt-6">
      <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
        出典・参考（公的一次情報）
      </h2>
      <ul className="flex flex-col gap-2 mb-3">
        {items.map((s) => (
          <li key={s.url} className="text-xs leading-relaxed">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-bold"
            >
              {s.label}
            </a>
            <span className="text-slate-400"> — {s.org}</span>
          </li>
        ))}
      </ul>
      {note && <p className="text-xs text-slate-400 leading-relaxed">{note}</p>}
      <p className="text-xs text-slate-400 leading-relaxed mt-2">
        本記事は上記の公的資料に基づき SafeBite 編集部が作成しています。内容は{" "}
        <Link href="/about" className="text-slate-500 underline hover:text-slate-700">
          運営者情報・編集方針
        </Link>{" "}
        をご確認ください。最新かつ正確な情報は各機関の公式サイトをご参照ください。
      </p>
    </section>
  );
}
