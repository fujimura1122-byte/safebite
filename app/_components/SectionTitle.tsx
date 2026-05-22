// サーバーコンポーネント — "use client" 不要
import type { ReactNode } from "react";

type Accent = "red" | "blue" | "amber" | "slate";

interface Props {
  /** ヘッダー上部の英語ラベルチップ */
  label: string;
  /** メインタイトル（JSX可） */
  title: ReactNode;
  /** サブテキスト */
  subtitle?: string;
  /** テキスト揃え */
  align?: "center" | "left";
  /** dark = ダーク背景向け（白文字）/ light = ライト背景向け（黒文字）*/
  dark?: boolean;
  /** ラベルチップのアクセントカラー */
  accent?: Accent;
  className?: string;
}

const chipDark: Record<Accent, string> = {
  red:   "bg-red-600 text-white",
  blue:  "bg-blue-600 text-white",
  amber: "bg-amber-500 text-white",
  slate: "bg-white/10 text-slate-300 border border-white/20",
};

const chipLight: Record<Accent, string> = {
  red:   "bg-red-600 text-white",
  blue:  "bg-blue-600 text-white",
  amber: "bg-amber-500 text-white",
  slate: "bg-slate-100 text-slate-600",
};

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = "center",
  dark = false,
  accent = "slate",
  className = "",
}: Props) {
  const isCenter = align === "center";
  const chip = dark ? chipDark[accent] : chipLight[accent];

  return (
    <div
      className={[
        "flex flex-col mb-12",
        isCenter ? "items-center text-center" : "items-start text-left",
        className,
      ].join(" ")}
    >
      <span
        className={`inline-block text-xs font-bold px-4 py-1.5 mb-5 tracking-[0.15em] uppercase ${chip}`}
      >
        {label}
      </span>
      <h2
        className={[
          "text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]",
          dark ? "text-white" : "text-slate-900",
        ].join(" ")}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm leading-relaxed max-w-xl ${
            dark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
