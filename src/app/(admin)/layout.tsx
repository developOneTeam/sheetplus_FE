import "@/app/globals.css";
import { header, title, sheet } from "@/app/styles/layouts.css";
import Link from "next/link";

export default async function SubRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <header className={header()}>
            <h1>
                <Link href="/admin" className={title}>
                    SCHU<span className={sheet}>sheet<sup>+</sup></span>
                </Link>
            </h1>
        </header>
        {children}
        </>
    );
}

export const runtime = 'edge';
