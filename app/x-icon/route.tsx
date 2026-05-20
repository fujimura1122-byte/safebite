import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "400px",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #1d4ed8 0%, #3b82f6 50%, #6366f1 100%)",
          borderRadius: "0px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 背景装飾：光の輪 */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        {/* シールドアイコン */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0px",
            zIndex: 1,
          }}
        >
          {/* シールド形状（SVGパスの代わりに重ねた角丸四角で近似） */}
          <div
            style={{
              width: "130px",
              height: "150px",
              background: "rgba(255,255,255,0.18)",
              borderRadius: "50% 50% 50% 50% / 10% 10% 40% 40%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "14px",
              border: "3px solid rgba(255,255,255,0.35)",
            }}
          >
            {/* SB テキスト */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0px",
              }}
            >
              <span
                style={{
                  fontSize: "52px",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1,
                  letterSpacing: "-2px",
                  fontFamily: "sans-serif",
                }}
              >
                SB
              </span>
            </div>
          </div>

          {/* SafeBite テキスト */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0px",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.5px",
                fontFamily: "sans-serif",
              }}
            >
              Safe
            </span>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 900,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "-0.5px",
                fontFamily: "sans-serif",
              }}
            >
              Bite
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 400,
      height: 400,
    }
  );
}
