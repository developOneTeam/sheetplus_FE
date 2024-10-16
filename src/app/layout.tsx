import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/app/components/Nav";
import { iconButton } from "./styles/buttons.css";
import { header, title, sheet, subtitle, iconNav } from "./styles/layouts.css";
import { icon } from "./styles/others.css";
import Link from "next/link";
import Logout from "./components/Logout";

const suiteV = localFont({
  src: "./fonts/SUITE-Variable.woff2",
  variable: "--font-suite-v",
  weight: "300 900",
});

export const metadata: Metadata = {
  title: "SCHU Sheet+",
  description: "순천향대학교 학부생을 위한 학술제 서비스",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">
      <body className={suiteV.className}>
        <header className={header()}>
          <h1>
            <Link href="/" className={title}>
              SCHU<span className={sheet}>sheet<sup>+</sup></span>
              <span className={subtitle}>제1회 SW융합대학 학술제</span>
            </Link>
          </h1>
          <section className={iconNav}>
            <Logout />
            <Link href="/notifications" className={`${iconButton()} ${icon} material-symbols-rounded`}>
              notifications
            </Link>
          </section>
        </header>
        {children}
        <Nav />
      </body>
    </html>
  );
}

export const runtime = 'edge';
