import "../globals.css";
import Nav from "@/app/components/Nav";
import { iconButton } from "../styles/buttons.css";
import { header, title, sheet, subtitle, iconNav } from "../styles/layouts.css";
import { icon } from "../styles/others.css";
import Link from "next/link";
import Logout from "../components/Logout";
import { cookies } from "next/headers";

export default async function SubRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const aToken = cookies().get("access");
    const rToken = cookies().get("refresh");

    return (
        <>
        <header className={header()}>
            <h1>
                <Link href="/" className={title}>
                    SCHU<span className={sheet}>sheet<sup>+</sup></span>
                    <span className={subtitle}>제1회 SW융합대학 학술제</span>
                </Link>
            </h1>
            <section className={iconNav}>
                <Logout />
                {aToken && rToken ? 
                    <Link href="./notifications" className={`${iconButton()} ${icon} material-symbols-rounded`}>
                        notifications
                    </Link>
                :""}
            </section>
        </header>
        {children}
        <Nav />
        </>
    );
}

export const runtime = 'edge';
