"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { iconButton } from "../styles/buttons.css";
import { iconDesc, navLayout, navList } from "../styles/layouts.css";
import { defaultP } from "../styles/others.css";
import { usePathname } from "next/navigation";
import Link from "next/link";


export default function Nav() {
    const [navDisplayed, showNav] = useState<boolean>(true);
    const path = usePathname();

    return (
        <footer>
            <button className={`${iconButton({ types: "navMenu" })} ${iconButton({ types: "nav" })}`} onClick={() => (
                navDisplayed ? showNav(false) : showNav(true)
            )}>
               <span className={`material-symbols-rounded`}>menu</span>
               <p className={defaultP({ size: "sm", width: "max" })}>메뉴</p>
            </button>
            <AnimatePresence>
            {navDisplayed ? (
                <motion.nav
                    initial={{ x: -1000 }}
                    animate={{ x: 0 }}
                    exit={{ x: -1000 }}
                    transition={{ duration: 0.8 }}
                    className={navLayout}
                >
                    <ul className={navList}>
                        <li><Link href="/" className={`${iconDesc} ${iconButton({ types: "nav"})} ${(path === "/" || path === "/home") ? iconButton({ types: "on" }) :""} `}>
                            <span className={`material-symbols-rounded`}>roofing</span>
                            <p className={defaultP({ size: "sm", width: "max" })}>홈</p>
                        </Link></li>
                        <li><Link href="/2/schedule" className={`${iconDesc} ${iconButton({ types: "nav"})} ${path === "/schedule" ? iconButton({ types: "on" }) :""}`}>
                            <span className={`material-symbols-rounded`}>calendar_month</span>
                            <p className={defaultP({ size: "sm", width: "max" })}>일정</p>
                        </Link></li>
                        <li><Link href="/2/activities" className={`${iconDesc} ${iconButton({ types: "nav"})} ${path === "/activities" ? iconButton({ types: "on" }) :""}`}>
                            <span className={`material-symbols-rounded`}>approval</span>
                            <p className={defaultP({ size: "sm", width: "max" })}>참여 활동</p>
                        </Link></li>
                        <li><Link href="/2/works" className={`${iconDesc} ${iconButton({ types: "nav"})} ${path === "/works" ? iconButton({ types: "on" }) :""}`}>
                            <span className={`material-symbols-rounded`}>architecture</span>
                            <p className={defaultP({ size: "sm", width: "max" })}>작품 찾기</p>
                        </Link></li>
                        <li><Link href="/2/settings" className={`${iconDesc} ${iconButton({ types: "nav"})} ${path === "/settings" ? iconButton({ types: "on" }) :""}`}>
                            <span className={`material-symbols-rounded`}>settings</span>
                            <p className={defaultP({ size: "sm", width: "max" })}>설정</p>
                        </Link></li>
                    </ul>
                </motion.nav>
            ): ""}
            </AnimatePresence>
        </footer>
    )
}