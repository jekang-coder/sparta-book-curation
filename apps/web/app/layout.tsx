import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "스파르타 북큐레이션",
  description: "팀스파르타 문화 기반 AI 맞춤 도서 추천 서비스",
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
