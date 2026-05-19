"use client";
import { useState } from "react";
import { sendGA, incCounter } from "./tracking";
import { A8_LAWYER_URL } from "./constants";

export default function SOSSection() {
  const [step, setStep]       = useState(0);
  const [form, setForm]       = useState({ when: "", what: "", whom: "", current: "" });
  const [template, setTemplate] = useState("");
  const [loading, setLoading]   = useState(false);
  const [copied, setCopied]     = useState(false);

  const fields = [
    { key: "when",    label: "いつ、どこで関わり始めましたか？",  placeholder: "例）2025年5月頃、InstagramのDMで声をかけられた" },
    { key: "what",    label: "何をしてしまいましたか？",          placeholder: "例）免許証の写真を送った。一度荷物を受け取って渡した" },
    { key: "whom",    label: "相手はどんな人ですか？",            placeholder: "例）Telegramの匿名アカウント。本名・顔は不明" },
    { key: "current", label: "今の状況を教えてください",          placeholder: "例）逃げたら家族に連絡すると脅されている" },
  ];

  const contacts = [
    { name: "警察相談専用",         num: "#9110",        tel: "9110",       desc: "24時間受付" },
    { name: "法テラス",             num: "0570-078374",  tel: "0570078374", desc: "無料法律相談" },
    { name: "よりそいホットライン", num: "0120-279-338", tel: "0120279338", desc: "24時間・無料" },
  ];

  const generate = async () => {
    setLoading(true);
    const prompt =
      "いつ：" + form.when + "\n何をしたか：" + form.what +
      "\n相手：" + form.whom + "\n現状：" + form.current;
    try {
      const res  = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: prompt, type: "sos" }),
      });
      const data = await res.json();
      setTemplate(data.text || "生成エラー。直接#9110へお電話ください。");
      setStep(5);
      incCounter("sos_generated");
      sendGA("sos_template_generated");
    } catch {
      setTemplate("エラーが発生しました。直接警察（#9110）へお電話ください。");
      setStep(5);
    } finally { setLoading(false); }
  };

  return (
    <section id="sos" className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase bg-emerald-50 text-emerald-700">
            機能③ 駆け込みSOS
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
            まだ間に合う。今すぐ抜け出せます
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            4問答えるだけで警察・法テラスに持参できる<br />
            <strong className="text-slate-700">説明文</strong>を自動生成します
          </p>
        </div>

        {/* 緊急連絡先 */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {contacts.map((c) => (
            <a
              key={c.name}
              href={"tel:" + c.tel}
              className="bg-white hover:bg-emerald-50 border-2 border-slate-100 hover:border-emerald-200 rounded-xl p-4 text-center transition-all block"
            >
              <div className="text-xs text-slate-400 mb-1">{c.name}</div>
              <div className="text-base font-black text-emerald-600">{c.num}</div>
              <div className="text-xs text-slate-400 mt-1">{c.desc}</div>
            </a>
          ))}
        </div>

        {step < 4 && (
          <div className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400 font-bold">
                  質問 {step + 1} / {fields.length}
                </span>
                <span className="text-xs text-slate-400">
                  {Math.round((step + 1) / fields.length * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: ((step + 1) / fields.length * 100) + "%" }}
                />
              </div>
            </div>
            <div className="p-6">
              <label className="block text-base font-bold text-slate-800 mb-3">
                {fields[step].label}
              </label>
              <textarea
                value={form[fields[step].key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [fields[step].key]: e.target.value })}
                placeholder={fields[step].placeholder}
                rows={4}
                className="w-full border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl p-3 text-sm text-slate-700 leading-relaxed resize-none outline-none transition-all"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => step === fields.length - 1 ? generate() : setStep(step + 1)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-xl transition-all text-sm"
                >
                  {step === fields.length - 1 ? "相談テンプレを生成する" : "次へ →"}
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-12 text-slate-400">
            <div className="w-10 h-10 border-2 border-slate-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm">相談テンプレを生成中...</p>
          </div>
        )}

        {step === 5 && template && (
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <span className="text-sm font-bold text-emerald-600">相談テンプレが完成しました</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(template);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className={"text-xs font-bold px-4 py-2 rounded-lg transition-all " +
                    (copied ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}
                >
                  {copied ? "コピー完了" : "コピー"}
                </button>
              </div>
              <div className="p-5 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {template}
              </div>
            </div>

            <a
              href={A8_LAWYER_URL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              onClick={() => sendGA("affiliate_click", { affiliate: "lawyer", position: "sos_template" })}
              className="flex items-center gap-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl p-5 transition-all group"
            >
              <span className="text-3xl flex-shrink-0">👨‍⚖️</span>
              <div className="flex-1">
                <div className="text-xs font-bold text-emerald-200 uppercase tracking-widest mb-1">
                  次のステップ
                </div>
                <div className="text-base font-black text-white">【無料相談】弁護士に今すぐ相談する</div>
                <div className="text-xs text-emerald-100 mt-1">
                  ヤミ金・恐喝・脅迫の専門家が対応。相談料0円・秘密厳守
                </div>
              </div>
              <span className="text-white text-xl group-hover:translate-x-1 transition-transform flex-shrink-0">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
