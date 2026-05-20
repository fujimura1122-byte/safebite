import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1500px",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(130deg, #ffffff 0%, #eff6ff 45%, #e0e7ff 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
          padding: "0 100px",
        }}
      >
        {/* 背景装飾：大きな円 */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "200px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)",
          }}
        />
        {/* 右上装飾 */}
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "320px",
            height: "320px",
            background: "linear-gradient(225deg, rgba(99,102,241,0.15) 0%, transparent 60%)",
          }}
        />

        {/* 左側：メインコピー */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            zIndex: 1,
            flex: 1,
          }}
        >
          {/* バッジ */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                background: "#fef2f2",
                border: "2px solid #fecaca",
                borderRadius: "9999px",
                padding: "6px 20px",
                fontSize: "20px",
                fontWeight: 700,
                color: "#dc2626",
              }}
            >
              🚨 闇バイト被害防止
            </div>
            <div
              style={{
                background: "#eff6ff",
                border: "2px solid #bfdbfe",
                borderRadius: "9999px",
                padding: "6px 20px",
                fontSize: "20px",
                fontWeight: 700,
                color: "#1d4ed8",
              }}
            >
              公益・非営利
            </div>
          </div>

          {/* ロゴ */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                fontSize: "72px",
                fontWeight: 900,
                color: "#2563eb",
                letterSpacing: "-3px",
                lineHeight: 1,
              }}
            >
              Safe
            </span>
            <span
              style={{
                fontSize: "72px",
                fontWeight: 900,
                color: "#0f172a",
                letterSpacing: "-3px",
                lineHeight: 1,
              }}
            >
              Bite
            </span>
          </div>

          {/* メインキャッチ */}
          <div
            style={{
              fontSize: "44px",
              fontWeight: 900,
              color: "#0f172a",
              lineHeight: 1.2,
              marginBottom: "16px",
              letterSpacing: "-1px",
            }}
          >
            そのバイト、本当に大丈夫？
          </div>

          {/* サブキャッチ */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#475569",
            }}
          >
            求人文をコピペするだけで、AIが危険度を即判定
          </div>
        </div>

        {/* 右側：機能カード */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            zIndex: 1,
            width: "380px",
            flexShrink: 0,
          }}
        >
          {[
            { icon: "🤖", text: "AI危険度チェッカー", sub: "0.5秒で即判定" },
            { icon: "🚨", text: "市民通報ハブ", sub: "IHC・警察庁に通報文を自動生成" },
            { icon: "🆘", text: "駆け込みSOS", sub: "相談テンプレを即生成" },
          ].map((item) => (
            <div
              key={item.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                background: "rgba(255,255,255,0.80)",
                border: "1.5px solid rgba(191,219,254,0.8)",
                borderRadius: "14px",
                padding: "14px 20px",
                boxShadow: "0 2px 12px rgba(59,130,246,0.08)",
              }}
            >
              <span style={{ fontSize: "28px" }}>{item.icon}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1.2,
                  }}
                >
                  {item.text}
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  {item.sub}
                </span>
              </div>
            </div>
          ))}

          {/* URL */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#94a3b8",
              textAlign: "right",
              marginTop: "4px",
            }}
          >
            saferbite.org
          </div>
        </div>
      </div>
    ),
    {
      width: 1500,
      height: 500,
    }
  );
}
