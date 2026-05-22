import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import RouteTracker from "./_components/RouteTracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saferbite.org"),
  title: "SafeBite｜そのバイト、本当に大丈夫？ AI危険度チェッカー",
  description:
    "日払い・即金・高収入バイトのテキストをコピペするだけでAIが危険度を即判定。闇バイト・詐欺リクルートから身を守る無料ツール。通報支援・SOS相談テンプレ生成・安全な求人紹介まで一括提供。",
  keywords:
    "闇バイト,やみバイト,危険なバイト,日払い 即金,高収入 裏,ブラック バイト,審査なし バイト,身分証 送った,Telegram バイト,テレグラム 怪しい,受け子 バイト,出し子,UD 意味,ホワ案,架け子,闇バイト 見分け方,闇バイト 断り方,闇バイト 逃げたい,闇バイト 通報,闇バイト 逮捕",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: [
      "2BB__Q0-Sc_lvS76O6zmIuPBDJ3mrctN2pg48FP9XWw", // safebite-zeta.vercel.app
      "55JNpH0Mimub7WRmNocpbsUmnztk8dW968_CEzj-b-Y",  // saferbite.org
    ],
  },
  openGraph: {
    title: "SafeBite｜そのバイト、本当に大丈夫？",
    description: "AIが0.5秒で危険度を判定。闇バイトから身を守る無料サービス。",
    url: "https://saferbite.org",
    siteName: "SafeBite",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeBite｜そのバイト、本当に大丈夫？",
    description: "AIが0.5秒で危険度を判定。闇バイトから身を守る無料サービス。",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <RouteTracker />
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-38B60QXS6D"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-38B60QXS6D', {
            anonymize_ip: true,
            link_attribution: true,
            send_page_view: true,
          });
        `}
      </Script>
    </html>
  );
}
