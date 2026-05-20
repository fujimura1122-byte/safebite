import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SafeBite｜そのバイト、本当に大丈夫？";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ffffff 0%, #eff6ff 40%, #e0e7ff 100%)",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* 背景装飾：薄いサークル */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
          }}
        />

        {/* メインコンテンツ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0px",
            zIndex: 1,
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* ロゴ */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                fontSize: "56px",
                fontWeight: 900,
                color: "#2563eb",
                letterSpacing: "-2px",
              }}
            >
              Safe
            </span>
            <span
              style={{
                fontSize: "56px",
                fontWeight: 900,
                color: "#0f172a",
                letterSpacing: "-2px",
              }}
            >
              Bite
            </span>
          </div>

          {/* メインキャッチ */}
          <div
            style={{
              fontSize: "54px",
              fontWeight: 900,
              color: "#0f172a",
              lineHeight: 1.2,
              marginBottom: "20px",
              letterSpacing: "-1px",
            }}
          >
            そのバイト、本当に大丈夫？
          </div>

          {/* サブキャッチ */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#2563eb",
              marginBottom: "40px",
            }}
          >
            AIが0.5秒で危険度を判定
          </div>

          {/* バッジ列 */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "44px",
            }}
          >
            {["無料", "匿名", "コピペだけ"].map((label) => (
              <div
                key={label}
                style={{
                  background: "#eff6ff",
                  border: "2px solid #bfdbfe",
                  borderRadius: "9999px",
                  padding: "10px 28px",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#1d4ed8",
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#94a3b8",
              letterSpacing: "0.5px",
            }}
          >
            saferbite.org
          </div>
        </div>

        {/* 左上の小さなバッジ */}
        <div
          style={{
            position: "absolute",
            top: "36px",
            left: "48px",
            background: "#fef2f2",
            border: "2px solid #fecaca",
            borderRadius: "12px",
            padding: "8px 20px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#dc2626",
          }}
        >
          🚨 闇バイト被害防止
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
