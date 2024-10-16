import { auth } from "@/auth";
import { iconDesc, main, mainSection } from "../../styles/layouts.css";
import { icon, defaultH2, defaultP } from "../../styles/others.css";
import { button } from "../../styles/buttons.css";

export default async function Page() {
    const session_original = await auth();
    const session = {
        user: true
    }

    console.log(session_original);

    return (
        <>
        {(session && session.user) ? (
            <main className={main({ center: true })}>
                <section className={mainSection}>
                    <div className={iconDesc}>
                        <span className={`${icon({ color: "disabled" })} material-symbols-rounded`}>
                        inbox
                        </span>
                        <h2 className={defaultH2({ style: "disabled" })}>알림 받을 잔여 일정이 없어요</h2>
                        <p className={defaultP({ style: "disabled" })}>일정 페이지에서 원하는 일정을 알림받을 수 있어요</p>
                        <a href="/" className={button({ types: "secondary" })}>홈으로 돌아가기</a>
                    </div>
                </section>
            </main>
        ):(
            <main className={main({ center: true })}>
                <section className={mainSection}>
                    <div className={iconDesc}>
                        <span className={`${icon({ color: "disabled" })} material-symbols-rounded`}>
                        priority_high
                        </span>
                        <h2 className={defaultH2({ style: "disabled" })}>로그인 부탁드려요</h2>
                        <p className={defaultP({ style: "disabled" })}>로그인한 사용자는 원하는 일정을 알림받을 수 있어요</p>
                        <a href="/" className={button({ types: "secondary" })}>홈으로 돌아가기</a>
                    </div>
                </section>
            </main>
        )}
        </>
    )
}

