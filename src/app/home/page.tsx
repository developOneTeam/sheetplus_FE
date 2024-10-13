import { auth } from "@/auth";
import { accentArea, header, iconDesc, main, mainSection, navList, stamp, stampList } from "../styles/layouts.css";
import { icon, defaultH2, defaultP, faqLink } from "../styles/others.css";
import { button } from "../styles/buttons.css";
import Link from "next/link";

const major:{ [key: number]: string } = {
    0: "컴퓨터소프트웨어공학과",
    1: "정보보호학과",
    2: "사물인터넷학과",
    3: "AI빅데이터학과",
    4: "의료IT공학과",
    5: "메타버스&게임학과"
}

export default async function Page() {
    const session = await auth();
    const user = {
        major: 5,
        name: "홍길동",
        event: {
            stamps: 3,
        }
    }

    const festival = {
        start_date: new Date("2024-11-05"),
        end_date: new Date("2024-11-06"),
        max_stamp: 5
    }

    function stamps() {
        const total = [];

        for (let i = 0; i < festival.max_stamp; i++) {
            total.push(
                <div className={stamp}>{i < user.event.stamps ? "OK" : ""}</div>
            )
        }

        return total;
    }

    function displayedDate() {
        const displayOption:{[key:string]: "numeric"|"long"} = {
            weekday: "long",
            month: "long",
            day: "numeric",
        }

        if (festival.start_date > new Date(Date.now())) {
            return festival.start_date.toLocaleDateString('ko-KR', displayOption);
        }
        else if (festival.end_date < new Date(Date.now())) {
            return festival.end_date.toLocaleDateString('ko-KR', displayOption)
        }
        else if (festival.end_date > new Date(Date.now())) {
            return festival.start_date.toLocaleDateString('ko-KR', displayOption)
        } else {
            return festival.end_date.toLocaleDateString('ko-KR', displayOption)
        }
    }

    return (
        <>
        {(session && session.user) ? (
            <main className={main()}>
                <section className={mainSection}>
                    // 알림 리스트 넣을 곳
                    <div className={iconDesc}>
                        <span className={`${icon({ color: "disabled" })} material-symbols-rounded`}>
                        inbox
                        </span>
                        <h2 className={defaultH2({ style: "disabled" })}>알림을 모두 읽었어요</h2>
                        <p className={defaultP({ style: "disabled" })}>일정 페이지에서 원하는 일정을 알림받을 수 있어요</p>
                        <a href="/" className={button({ types: "secondary" })}>홈으로 돌아가기</a>
                    </div>
                </section>
            </main>
        ):(
            <main className={main({ center: false })}>
                <h2 className={defaultH2()}>
                    <span className={
                        defaultP({ size: "sm", style: "disabled", width: "block", weight: "semiBold" })
                    }>{major[user.major]}</span>
                    <span className={defaultH2({ style: "primary" })}>{user.name}</span>님 안녕하세요!
                </h2>
                <section className={accentArea()}>
                    <div className={stampList}>
                        {stamps()}
                    </div>
                    {user.event.stamps === 0 ? (<p>활동 참여로 스탬프를 획득해보세요!</p>):
                        (<p>스탬프 <span className={defaultP({ style: "secondary", weight: "semiBold" })}>{user.event.stamps}</span>개 획득!</p>)}
                    <p></p>
                    <Link href="/activities" className={faqLink({ style: "nonButton", underline: false, margin: "updown" })}>참여 활동 확인하기 →</Link>
                </section>
                <section className={header({ section: true })}>
                    <h2 className={defaultH2({ style: "nomargin" })}>
                        <span className={
                            defaultP({ size: "sm", style: "disabled", width: "block", weight: "semiBold" })
                        }>{displayedDate()}</span>
                        지금 참여할 수 있는 활동이에요
                    </h2>
                    <Link href="/activites" className={faqLink({ style: "nonButton", underline: false, margin: "updown" })}>+ 더보기</Link>
                </section>
                {/* <div className={iconDesc}>
                    <span className={`${icon({ color: "disabled" })} material-symbols-rounded`}>
                    priority_high
                    </span>
                    <h2 className={defaultH2({ style: "disabled" })}>로그인 부탁드려요</h2>
                    <p className={defaultP({ style: "disabled" })}>로그인한 사용자는 이벤트에 참여할 수 있어요</p>
                    <a href="/" className={button({ types: "secondary" })}>홈으로 돌아가기</a>
                </div> */}
            </main>
        )}
        </>
    )
}

export const runtime = 'edge';
