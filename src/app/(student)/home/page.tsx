import { accentArea, header, homeHello, iconDesc, main, stamp, stamped, stampList } from "../../styles/layouts.css";
import { icon, defaultH2, defaultP, faqLink } from "../../styles/others.css";
import { button, iconButton } from "../../styles/buttons.css";
import Link from "next/link";
import { displayedDate, randomNextSchedule } from "../../utils/schedule";
import ContentsTable from "../../components/ContentsTable";
import { cookies } from "next/headers";
import { user, festival } from "@/app/data/dummy";

export function stamps(user: { event: { stamps: number } }, festival: { max_stamp: number }) {
    const total = [];

    for (let i = 0; i < festival.max_stamp; i++) {
        total.push(
            <div key={i} className={stamp}>
                {i < user.event.stamps ? 
                    <div className={`${stamped} material-symbols-rounded`}>approval</div> :
                    <div className={`${stamped} material-symbols-rounded`}>hide_source</div>
                }
            </div>
        )
    }

    return total;
}

export default async function Page() {
    const accessToken = cookies().get("access");

    console.log(accessToken);

    const session = {
        user: true
    }

    const rEvent = randomNextSchedule(user.event.stamp, festival.schedule);

    return (
        <>
        {(session && session.user) ? (
            <main className={main({ center: false })}>
                <div className={homeHello}>
                    <h2 className={defaultH2()}>
                        <span className={
                            defaultP({ size: "sm", style: "disabled", width: "block", weight: "semiBold" })
                        }>{user.studentMajor}</span>
                        <span className={defaultH2({ style: "primary" })}>{user.studentName}</span>님 안녕하세요!
                    </h2>
                    <Link href="/check" className={`${icon()} ${iconButton()} material-symbols-rounded`}>qr_code</Link>
                </div>
                <section className={accentArea()}>
                    <div className={stampList}>
                        {stamps(user, festival)}
                    </div>
                    <div>
                        <p className={defaultP({ size: "l", lineHeight: "ui" })}>
                            {user.event.stamps === 0 ? (rEvent ? "" : "활동 참여로 스탬프를 획득해보세요!") :
                            <>스탬프&nbsp;
                                <span className={defaultP({ style: "secondary", weight: "semiBold" })}>{user.event.stamps}</span>
                            개 획득!</>}
                        </p>
                        <p className={defaultP({ size: "l", lineHeight: "ui" })}>
                        {user.event.stamps < festival.max_stamp && rEvent ? 
                            <><span className={defaultP({ style: "primary", size: "l" })}>
                                {rEvent.startTime instanceof Date ? (
                                    rEvent.startTime.toLocaleString("ko-KR", {hour: "2-digit", hourCycle: "h23"})
                                ) : rEvent.startTime}
                                &nbsp;{rEvent.building} {rEvent.location}</span>에서 열리는
                            <br />
                            <span className={defaultP({ weight: "bold", size: "l" })}>
                                {rEvent.major} {rEvent.categoryMessage === "" ? rEvent.name : rEvent.categoryMessage} 
                            </span>&nbsp;행사에 참여해보세요.
                        </>: "오늘 하루 고생하셨어요 :)"}
                        </p>
                    </div>
                    <Link href="/activities" className={faqLink({ style: "nonButton", underline: false, margin: "updown" })}>참여 활동 확인하기 →</Link>
                </section>
                <section>
                    <div className={header({ section: true })}>
                        <h2 className={defaultH2({ style: "nomargin" })}>
                            <span className={
                                defaultP({ size: "sm", style: "disabled", width: "block", weight: "semiBold" })
                            }>{displayedDate(festival)}</span>
                            지금 참여할 수 있는 활동이에요
                        </h2>
                        <Link href="/activites" className={faqLink({ style: "nonButton", underline: false, margin: "updown" })}>+ 더보기</Link>
                    </div>
                    <ContentsTable type="schedule" stamp={user.event.stamp} data={festival.schedule} />
                </section>
            </main>
        ):(
            <main className={main({ center: true })}>
                <div className={iconDesc}>
                    <span className={`${icon({ color: "disabled" })} material-symbols-rounded`}>
                    priority_high
                    </span>
                    <h2 className={defaultH2({ style: "disabled" })}>로그인 부탁드려요</h2>
                    <p className={defaultP({ style: "disabled" })}>로그인한 사용자는 이벤트에 참여할 수 있어요</p>
                    <a href="/" className={button({ types: "secondary" })}>로그인으로 돌아가기</a>
                </div>
            </main>
        )}
        </>
    )
}

