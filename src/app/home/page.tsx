import { auth } from "@/auth";
import { accentArea, header, iconDesc, main, scheduleContentBlock, scheduleLine, schedulePlace, scheduleTable, stamp, stamped, stampList } from "../styles/layouts.css";
import { icon, defaultH2, defaultP, faqLink } from "../styles/others.css";
import { button } from "../styles/buttons.css";
import Link from "next/link";

const major:{ [key: number]: string } = {
    0: "SW융합대학",
    1: "컴퓨터소프트웨어공학과",
    2: "정보보호학과",
    3: "사물인터넷학과",
    4: "AI빅데이터학과",
    5: "의료IT공학과",
    6: "메타버스&게임학과"
}

const building:{ [key: number]: string} = {
    0: "인문과학관",
    1: "공학관",
    2: "멀티미디어관",
    3: "SCH미디어랩스관",
    4: "의료과학관"
}

const category:{ [key: number]: string} = {
    0: "SW프로젝트 경진대회",
    1: "졸업생 토크콘서트",
    2: "전문가 특강",
    3: ""
}

type schedule = {
    id: string,
    name: string,
    major: number,
    category: number,
    building: number,
    room: string|number,
    stamp: boolean,
    day? :number,
    start_date: Date|string
}

export default async function Page() {
    const now = new Date(Date.now());

    const session_original = await auth();
    const session = {
        user: true
    }

    console.log(session_original);

    const user = {
        major: 5,
        name: "홍길동",
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
            id: "ccca",
            name: "개회식",
            major: 0,
            category: 3,
            building: 0,
            room: "대강당",
            stamp: true,
            start_date: new Date("2024-11-05 10:00")
        }, {
            id: "baca",
            name: "코딩테스트, 무엇이 중요한가?",
            major: 1,
            category: 1,
            building: 2,
            room: "M502",
            stamp: true,
            start_date: new Date("2024-11-05 12:00")
        }, {
            id: "aacd",
            name: "전시 및 관람",
            major: 1,
            category: 0,
            building: 2,
            room: "5층",
            stamp: false,
            day: 0,
            start_date: "종일" 
        }, {
            id: "xdss",
            name: "eSports 경진대회",
            major: 0,
            category: 3,
            building: 0,
            room: "6125",
            stamp: true,
            day: 0,
            start_date: "오후" 
        }, {
            id: "bbbe",
            name: "IoT 시대의 보안을 논하다",
            major: 3,
            category: 1,
            building: 3,
            room: "ML313",
            stamp: true,
            start_date: new Date("2024-11-05 14:00")
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

    function filterScheduleByTime(array:schedule[]) {
        return array.filter((event) => {
            if (event.start_date === "종일")
                return true;
            else if (event.start_date === "오전" && now.getHours() < 12)
                return true;
            else if (event.start_date === "오후" && now.getHours() > 12)
                return true;
            else if (event.start_date instanceof Date && event.start_date.getHours() >= now.getHours())
                return true;
            else
                return false;
        });
    }

    function randomNextSchedule(schedule: schedule[]) {
        const array = filterScheduleByTime(schedule).filter((event) => !user.event.stamp.includes(event.id) && event.stamp);
        return array[Math.floor(Math.random() * array.length)];
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

    const rEvent = randomNextSchedule(festival.schedule);

    return (
        <>
        {(session && session.user) ? (
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
                    <div>
                        <p className={defaultP({ size: "l" })}>
                            {user.event.stamps === 0 ? (rEvent ? "" : "활동 참여로 스탬프를 획득해보세요!") :
                            <>스탬프&nbsp;
                                <span className={defaultP({ style: "secondary", weight: "semiBold" })}>{user.event.stamps}</span>
                            개 획득!</>}
                        </p>
                        <p className={defaultP({ size: "l" })}>
                        {user.event.stamps < festival.max_stamp && rEvent ? 
                            <>{rEvent.start_date instanceof Date ? 
                                rEvent.start_date.toLocaleString("ko-KR", {hour: "numeric", minute: "numeric"}) : rEvent.start_date},
                            <br />
                            {building[rEvent.building]} {rEvent.room}에서 열리는
                            {major[rEvent.major]} {category[rEvent.category]} {rEvent.name} 행사에 참여해보세요.
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
                            }>{displayedDate()}</span>
                            지금 참여할 수 있는 활동이에요
                        </h2>
                        <Link href="/activites" className={faqLink({ style: "nonButton", underline: false, margin: "updown" })}>+ 더보기</Link>
                    </div>
                    <ul className={scheduleTable}>
                        {filterScheduleByTime(festival.schedule).map((event) => (
                            <li key={event.id}><Link href={`/activities/${event.id}`} className={scheduleLine}>
                                <div className={scheduleContentBlock}>
                                    <p className={defaultP({ size: "lg", width: "time", align: "center" })}>
                                    {event.start_date instanceof Date ? <>{event.start_date.getHours}:{event.start_date.getMinutes}</> : event.start_date}
                                    </p>
                                    <p className={defaultP({ size: "lg" })}>
                                        <span className={defaultP({ size: "sm", style: "disabled", width: "block" })}>
                                            {major[event.major]} {category[event.category]}
                                        </span>
                                        {event.name}
                                    </p>
                                </div>
                                <div className={scheduleContentBlock}>
                                    <div className={`${icon({color: "notice"})} material-symbols-rounded`}>{event.stamp ? (user.event.stamp.includes(event.id) ? "check_circle" :"approved") : ""}</div>
                                    <p className={`${schedulePlace} ${defaultP({ size: "lg", style: "disabled" })}`}>
                                        <span className={defaultP({ size: "sm", style: "disabled" })}>{building[event.building]}</span>
                                        {event.room}
                                    </p>
                                </div>
                            </Link></li>
                        ))}
                    </ul>
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

export const runtime = 'edge';
