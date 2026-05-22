"use client";

// Next.js App Router のクライアントサイドナビゲーションを GA4 に送信する
// layout.tsx に <RouteTracker /> を追加することで、/glossary や /guide/* など
// 各ページへの遷移が自動的に page_view イベントとして記録される

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = "G-38B60QXS6D";

export default function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.gtag === "function"
    ) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}
