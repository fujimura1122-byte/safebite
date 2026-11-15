"use client";
import { useEffect, useState } from "react";

// ── サービス終了のお知らせバナー ──────────────────────────────────────────────
// ドメイン saferbite.org は 2027-05-19 に失効予定（Cloudflareで自動更新OFF）。
// その前に訪問者へ終了を告知し、公的な相談窓口へ誘導する。
//
// 【重要】必ずクライアントコンポーネントにすること。
// サーバー側で日付判定すると「ビルド時刻」で固定され、再デプロイしない限り
// 永久に表示されない。訪問者のブラウザで現在日時を見る必要がある。

/** サービス終了日（＝ドメイン失効日） */
const CLOSURE_DATE = new Date("2027-05-19T00:00:00+09:00");
/** お知らせを出し始める日（終了の約2ヶ月前）。前倒ししたい場合はここを変更する */
const NOTICE_FROM = new Date("2027-03-19T00:00:00+09:00");

const DISMISS_KEY = "safebite-closure-notice-dismissed";

export default function ClosureNotice() {
  const [show, setShow] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const now = new Date();
    if (now < NOTICE_FROM) return;
    setEnded(now >= CLOSURE_DATE);
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
    } catch {
      // プライベートブラウジング等で参照できない場合はそのまま表示する
    }
    setShow(true);
  }, []);

  if (!show) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // 保存できなくても閉じる動作は行う
    }
    setShow(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-slate-950 border-t-2 border-amber-500 shadow-2xl">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">📢</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-amber-400 mb-1">
            {ended
              ? "SafeBiteはサービスを終了しました"
              : "SafeBiteは2027年5月19日をもってサービスを終了します"}
          </p>
          <p className="text-xs text-slate-300 leading-relaxed mb-2">
            これまでご利用いただきありがとうございました。
            闇バイトに関する相談は、以下の公的窓口をご利用ください。
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="tel:9110"
              className="text-xs font-bold bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              📞 警察相談専用電話 #9110
            </a>
            <a
              href="https://www.houterasu.or.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold bg-white/10 hover:bg-white/20 text-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              法テラス 0570-078374
            </a>
            <a
              href="https://www.cfa.go.jp/policies/youth-kankyou/yami-baito"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold bg-white/10 hover:bg-white/20 text-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              こども家庭庁の情報
            </a>
          </div>
        </div>
        <button
          onClick={dismiss}
          aria-label="お知らせを閉じる"
          className="text-slate-500 hover:text-slate-300 text-lg leading-none flex-shrink-0 px-1 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}
