import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const suiteV = localFont({
  src: "./fonts/SUITE-Variable.woff2",
  variable: "--font-suite-v",
  weight: "300 900"
});

export const metadata: Metadata = {
  title: "SCHU Sheet+",
  description: "순천향대학교 학부생을 위한 학술제 서비스",
  icons: {
    icon: "/favicon.png"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">
      <body className={suiteV.className}>
        {children}
      </body>
    </html>
  );
}

export const runtime = 'edge';
