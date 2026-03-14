import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "스파르타 북큐레이션 — 팀문화로 풀어줄 책";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#222222",
          padding: "80px",
        }}
      >
        {/* 로고 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: "#FA0030",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 900,
              color: "#fff",
            }}
          >
            S
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#ffffff" }}>
            SPARTA BOOK CURATION
          </span>
        </div>

        {/* 메인 타이틀 */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.15,
            textAlign: "center",
            marginBottom: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>지금 내 고민,</span>
          <span style={{ color: "#FA0030" }}>팀문화로 풀어줄 책 📚</span>
        </div>

        {/* 설명 */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          연차 + 고민 입력 → AI가 팀스파르타 핵심가치 기반으로 책 3권 추천
        </div>

        {/* 하단 배지 */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 48,
          }}
        >
          {["빠르게", "와우하게", "진정성있게"].map((v) => (
            <div
              key={v}
              style={{
                background: "rgba(250,0,48,0.2)",
                border: "1px solid #FA0030",
                color: "#FA0030",
                fontSize: 18,
                fontWeight: 600,
                padding: "8px 20px",
                borderRadius: 100,
              }}
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
