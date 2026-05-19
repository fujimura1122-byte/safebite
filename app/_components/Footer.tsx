"use client";
import { ShareButtons } from "./ShareButtons";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-500 py-12 px-4 text-xs leading-relaxed">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 border border-white/8 rounded-2xl p-6 mb-10">
          <ShareButtons />
        </div>
        <div className="text-center">
          <div className="font-black text-base mb-3">
            <span className="text-red-500">Safe</span>
            <span className="text-white">Bite</span>
          </div>
          <div className="flex gap-4 justify-center mb-4 flex-wrap">
            <a href="/glossary" className="hover:text-slate-300 transition-colors">闇バイト隠語辞典</a>
            <a href="/about"   className="hover:text-slate-300 transition-colors">運営者情報</a>
            <a href="/privacy" className="hover:text-slate-300 transition-colors">プライバシーポリシー</a>
            <a href="/contact" className="hover:text-slate-300 transition-colors">お問い合わせ</a>
          </div>
          <p className="text-slate-600 leading-relaxed">
            SafeBiteは闇バイト撲滅を目的とした公益Webサービスです。<br />
            AI判定は参考情報であり法的根拠を保証しません。入力情報はサーバーに保存されません。
            <br /><br />
            © 2025 SafeBite Project — すべての人が安全に働ける社会のために
          </p>
        </div>
      </div>
    </footer>
  );
}
