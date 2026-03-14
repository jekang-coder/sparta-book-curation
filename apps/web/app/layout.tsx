import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "스파르타 북큐레이션",
  description: "지금 내 고민, 팀문화로 풀어줄 책 📚 연차와 고민을 입력하면 팀스파르타 핵심가치 기반으로 AI가 딱 맞는 책 3권을 추천해드립니다.",
  openGraph: {
    title: "스파르타 북큐레이션 📚",
    description: "지금 내 고민, 팀문화로 풀어줄 책 — 팀스파르타 핵심가치 기반 AI 맞춤 도서 추천",
    url: "https://sparta-book-curation.vercel.app",
    siteName: "스파르타 북큐레이션",
    images: [
      {
        url: "https://sparta-book-curation.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "스파르타 북큐레이션 — 팀문화로 풀어줄 책",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "스파르타 북큐레이션 📚",
    description: "지금 내 고민, 팀문화로 풀어줄 책 — 팀스파르타 핵심가치 기반 AI 맞춤 도서 추천",
    images: ["https://sparta-book-curation.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
