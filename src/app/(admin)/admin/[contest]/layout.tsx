import { button } from "@/app/styles/buttons.css";
import { adminLayout, adminMenuList, adminNav } from "@/app/styles/layouts.css";
import { adminMenuLink, icon } from "@/app/styles/others.css";
import Link from "next/link";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <div className={adminLayout}>
            <nav className={adminNav}>
                <ul className={adminMenuList}>
                    <li><Link href="/" className={adminMenuLink}>
                        <span className={`${icon({ size: "lg" })} material-symbols-rounded`}>home</span>
                        홈
                    </Link></li>
                    <li><Link href="/manageInfo" className={adminMenuLink}>
                        <span className={`${icon({ size: "lg" })} material-symbols-rounded`}>custom_typography</span>
                        행사 정보 관리
                    </Link></li>
                    <li><Link href="/manageStudent" className={adminMenuLink}>
                        <span className={`${icon({ size: "lg" })} material-symbols-rounded`}>account_circle</span>
                        참여 학생 관리
                    </Link></li>
                    <li><Link href="/manageEvents" className={adminMenuLink}>
                        <span className={`${icon({ size: "lg" })} material-symbols-rounded`}>calendar_clock</span>
                        일정 관리
                    </Link></li>
                    <li><Link href="/manageWorks" className={adminMenuLink}>
                        <span className={`${icon({ size: "lg" })} material-symbols-rounded`}>edit_document</span>
                        작품 관리
                    </Link></li>
                    <li><Link href="/manageDraw" className={adminMenuLink}>
                        <span className={`${icon({ size: "lg" })} material-symbols-rounded`}>approval</span>
                        출석 이벤트 관리
                    </Link></li>
                    <li><Link href="/manageAdmins" className={adminMenuLink}>
                        <span className={`${icon({ size: "lg" })} material-symbols-rounded`}>manage_accounts</span>
                        관리자 명단 관리
                    </Link></li>
                </ul>
                <Link href={`/event/1/pick`} className={button({types: "secondary"})}>참석자 추첨 바로가기</Link>
            </nav>
            {children}
        </div>
        </>
    )
}