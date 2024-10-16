import { auth } from "@/auth";
import { accentArea, header, iconDesc, main, stamp, stamped, stampList } from "../styles/layouts.css";
import { icon, defaultH2, defaultP, faqLink } from "../styles/others.css";
import { button } from "../styles/buttons.css";
import Link from "next/link";
import { displayedDate, randomNextSchedule } from "../utils/schedule";
import ContentsTable from "../components/ContentsTable";

export default async function Page() {
    

    const session_original = await auth();
    const session = {
        user: true
    }

    console.log(session_original);

    const user = {
        studentMajor: "의료IT공학과",
        studentName: "홍길동",
        event: {
            stamps: 3,
            stamp: ["ccca", "baca", "xdss"]
        }
    }

    const festival = {
        start_date: new Date("2024-11-05"),
        end_date: new Date("2024-11-06"),
        max_stamp: 5,
        schedule: [{
            secureId: "ccca",
            name: "개회식",
            major: "SW융합대학",
            categoryMessage: "",
            building: "인문과학관",
            location: "대강당",
            eventTypeMessage: "stamp",
            startTime: new Date("2024-11-05 10:00")
        }, {
            secureId: "baca",
            name: "코딩테스트, 무엇이 중요한가?",
            major: "컴퓨터소프트웨어공학과",
            categoryMessage: "졸업생 토크콘서트",
            building: "멀티미디어관",
            location: "M502",
            eventTypeMessage: "stamp",
            startTime: new Date("2024-11-05 12:00")
        }, {
            secureId: "aacd",
            name: "전시 및 관람",
            major: "컴퓨터소프트웨어공학과",
            categoryMessage: "SW프로젝트 경진대회",
            building: "멀티미디어관",
            location: "5층",
            eventTypeMessage: "normal",
            startTime: "종일" 
        }, {
            secureId: "xdss",
            name: "eSports 경진대회",
            major: "SW융합대학",
            categoryMessage: "",
            building: "인문과학관",
            location: "6125",
            eventTypeMessage: "stamp",
            startTime: "오후" 
        }, {
            secureId: "bbbe",
            name: "IoT 시대의 보안을 논하다",
            major: "사물인터넷학과",
            categoryMessage: "졸업생 토크콘서트",
            building: "미디어랩스관",
            location: "ML313",
            eventTypeMessage: "stamp",
            startTime: new Date("2024-11-05 14:00")
        }]
    }

    function stamps() {
        const total = [];

        for (let i = 0; i < festival.max_stamp; i++) {
            total.push(
                <div key={i} className={stamp}>
                    {i < user.event.stamps ? <div className={`${stamped} material-symbols-rounded`}>approval</div> : ""}
                </div>
            )
        }

        return total;
    }

    

    const rEvent = randomNextSchedule(user.event.stamp, festival.schedule);

    return (
        <>
        {(session && session.user) ? (
            <main className={main({ center: false })}>
                <h2 className={defaultH2()}>
                    <span className={
                        defaultP({ size: "sm", style: "disabled", width: "block", weight: "semiBold" })
                    }>{user.studentMajor}</span>
                    <span className={defaultH2({ style: "primary" })}>{user.studentName}</span>님 안녕하세요!
                </h2>
                <section className={accentArea()}>
                    <div className={stampList}>
                        {stamps()}
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
