"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { iconButton } from "../styles/buttons.css";
import { iconDesc, navLayout, navList } from "../styles/layouts.css";
import { defaultP } from "../styles/others.css";


export default function Nav() {
    const [navDisplayed, showNav] = useState<boolean>(true);

    return (
        <footer>
            <button className={`${iconDesc} ${iconButton({ types: "navMenu" })} ${iconButton({ types: "nav" })}`} onClick={() => (
                navDisplayed ? showNav(false) : showNav(true)
            )}>
               <span className={`material-symbols-rounded`}>menu</span>
               <p className={defaultP({ size: "sm", width: "max" })}>메뉴</p>
            </button>
            <AnimatePresence>
            {navDisplayed ? (
                <motion.div
                    initial={{ x: -1000 }}
                    animate={{ x: 0 }}
                    exit={{ x: -1000 }}
                    style={{ position: "fixed", bottom: 0 }}
                    transition={{ duration: 0.8 }}
                >
                <nav className={navLayout}>
                    <ul className={navList}>
                        <li><a href="/" className={`${iconDesc} ${iconButton({ types: "nav"})}`}>
                            <span className={`material-symbols-rounded`}>roofing</span>
                            <p className={defaultP({ size: "sm", width: "max" })}>홈</p>
                        </a></li>
                        <li><a href="/schedule" className={`${iconDesc} ${iconButton({ types: "nav"})}`}>
                            <span className={`material-symbols-rounded`}>calendar_month</span>
                            <p className={defaultP({ size: "sm", width: "max" })}>일정</p>
                        </a></li>
                        <li><a href="/activities" className={`${iconDesc} ${iconButton({ types: "nav"})}`}>
                            <span className={`material-symbols-rounded`}>approval</span>
                            <p className={defaultP({ size: "sm", width: "max" })}>참여 활동</p>
                        </a></li>
                        <li><a href="/works" className={`${iconDesc} ${iconButton({ types: "nav"})}`}>
                            <span className={`material-symbols-rounded`}>architecture</span>
                            <p className={defaultP({ size: "sm", width: "max" })}>작품 찾기</p>
                        </a></li>
                        <li><a href="/settings" className={`${iconDesc} ${iconButton({ types: "nav"})}`}>
                            <span className={`material-symbols-rounded`}>settings</span>
                            <p className={defaultP({ size: "sm", width: "max" })}>설정</p>
                        </a></li>
                    </ul>
                </nav>
                </motion.div>
            ): ""}
            </AnimatePresence>
        </footer>
    )
}