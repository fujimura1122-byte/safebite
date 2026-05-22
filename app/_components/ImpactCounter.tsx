"use client";
import { useState, useEffect } from "react";

export default function ImpactCounter() {
  const [counts, setCounts] = useState({
    ai_checks: 0, reports_submitted: 0, sos_generated: 0, ihc_verified: 0,
  });

  useEffect(() => {
    fetch("/api/counter")
      .then((r) => r.json())
      .then(setCounts)
      .catch(() => {});
  }, []);

  const total =
    counts.ai_checks + counts.reports_submitted + counts.sos_generated + counts.ihc_verified;
  if (total === 0) return null;

  return (
    <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
      <div className="text-xs font-bold text-slate-600 uppercase tracking-widest text-center mb-3">
        SafeBite 累計実績
      </div>
      <div className="flex justify-around gap-2 flex-wrap">
        {counts.ihc_verified > 0 && (
          <div className="text-center">
            <div className="text-2xl font-black tabular-nums text-red-400">
              {counts.ihc_verified.toLocaleString("ja-JP")}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">IHC通報確認済み</div>
          </div>
        )}
        {counts.ai_checks > 0 && (
          <div className="text-center">
            <div className="text-2xl font-black tabular-nums text-amber-400">
              {counts.ai_checks.toLocaleString("ja-JP")}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">AI危険判定</div>
          </div>
        )}
        {counts.sos_generated > 0 && (
          <div className="text-center">
            <div className="text-2xl font-black tabular-nums text-emerald-400">
              {counts.sos_generated.toLocaleString("ja-JP")}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">SOS相談</div>
          </div>
        )}
      </div>
    </div>
  );
}
