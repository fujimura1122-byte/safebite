// ブラウザ専用ユーティリティ（クライアントコンポーネントからのみ呼び出すこと）

declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}

export function sendGA(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export function incCounter(
  key: "ai_checks" | "reports_submitted" | "sos_generated" | "ihc_verified",
) {
  fetch("/api/counter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
  }).catch(() => {});
}
