"use client";

import { useState } from "react";
import Link from "next/link";
import { sendGA } from "@/app/_components/tracking";

type FormState = "idle" | "sending" | "success" | "error";

const INQUIRY_TYPES = [
  "サービスに関するご質問",
  "メディア・取材のお問い合わせ",
  "企業・団体との連携のご提案",
  "不具合・バグの報告",
  "その他",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: INQUIRY_TYPES[0],
    message: "",
  });
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: "" }), // ハニーポット（人間は常に空）
      });
      if (!res.ok) throw new Error();
      setState("success");
      sendGA("contact_submitted", { inquiry_type: form.type });
    } catch {
      setState("error");
    }
  };

  const isValid = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <>
      {/* ナビ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-lg tracking-tight">
            <span className="text-blue-600">Safe</span>
            <span className="text-slate-900">Bite</span>
          </Link>
          <Link href="/" className="text-xs font-bold px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
            ← トップに戻る
          </Link>
        </div>
      </nav>

      <main className="pt-14 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-16">

          {/* ヘッダー */}
          <div className="mb-10">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Contact</p>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">お問い合わせ</h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              ご質問・ご要望・取材依頼・連携のご提案など、お気軽にお問い合わせください。<br />
              通常3営業日以内にご返信いたします。
            </p>
          </div>

          {/* お問い合わせ種別ガイド */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {[
              { icon: "❓", label: "一般ユーザー", desc: "サービスの使い方・AIの判定結果への疑問など" },
              { icon: "📰", label: "メディア・取材", desc: "記事掲載・取材・監修のご依頼" },
              { icon: "🤝", label: "企業・団体", desc: "連携・提携・協力のご提案" },
            ].map((item) => (
              <div key={item.label} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-xs font-bold text-slate-700 mb-1">{item.label}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* フォーム */}
          {state === "success" ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-black text-emerald-900 mb-2">送信が完了しました</h2>
              <p className="text-sm text-emerald-700 leading-relaxed mb-6">
                お問い合わせありがとうございます。<br />
                内容を確認の上、3営業日以内にご返信いたします。
              </p>
              <Link
                href="/"
                className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
              >
                トップページに戻る
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 space-y-5">

                {/* お名前 */}
                <Field label="お名前" required>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="山田 太郎"
                    required
                    className="w-full border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-all"
                  />
                </Field>

                {/* メールアドレス */}
                <Field label="メールアドレス" required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="example@email.com"
                    required
                    className="w-full border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 transition-all"
                  />
                </Field>

                {/* お問い合わせ種別 */}
                <Field label="お問い合わせの種別">
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none bg-white transition-all"
                  >
                    {INQUIRY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>

                {/* お問い合わせ内容 */}
                <Field label="お問い合わせ内容" required>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="お問い合わせの内容を具体的にご記入ください"
                    rows={6}
                    required
                    className="w-full border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 resize-none transition-all leading-relaxed"
                  />
                </Field>

              </div>

              {/* 送信ボタン */}
              <div className="px-6 pb-6">
                {state === "error" && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
                    送信中にエラーが発生しました。時間をおいて再度お試しください。
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!isValid || state === "sending"}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-4 rounded-xl text-sm transition-all"
                >
                  {state === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      送信中...
                    </span>
                  ) : "送信する →"}
                </button>
                <p className="text-xs text-slate-400 text-center mt-3">
                  送信いただいた内容は本サービスの運営改善目的にのみ使用します。
                </p>
              </div>
            </form>
          )}

          {/* 緊急の場合の案内 */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex gap-3 items-start">
              <span className="text-xl flex-shrink-0">⚠️</span>
              <div>
                <div className="font-bold text-amber-900 text-sm mb-1">今すぐ助けが必要な場合</div>
                <p className="text-xs text-amber-700 leading-relaxed mb-2">
                  闇バイトに関わってしまい今すぐ相談したい場合は、お問い合わせフォームではなく
                  以下の公的機関に直接ご相談ください。
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:9110" className="text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-all">
                    📞 警察相談 #9110
                  </a>
                  <Link href="/#sos" className="text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-all">
                    🆘 SafeBite SOS機能を使う
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-widest">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-500 py-10 px-4 text-xs">
      <div className="max-w-2xl mx-auto text-center">
        <div className="font-black text-base mb-4">
          <span className="text-blue-400">Safe</span>
          <span className="text-white">Bite</span>
        </div>
        <div className="flex gap-4 justify-center mb-4 flex-wrap">
          <Link href="/" className="hover:text-slate-300 transition-colors">ホーム</Link>
          <Link href="/glossary" className="hover:text-slate-300 transition-colors">隠語辞典</Link>
          <Link href="/about" className="hover:text-slate-300 transition-colors">運営者情報</Link>
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">プライバシーポリシー</Link>
          <Link href="/contact" className="hover:text-slate-300 transition-colors">お問い合わせ</Link>
        </div>
        <p className="text-slate-600">© 2026 SafeBite Project — すべての人が安全に働ける社会のために</p>
      </div>
    </footer>
  );
}
