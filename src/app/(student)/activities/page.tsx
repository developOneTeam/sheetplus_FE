import { mainSection, iconDesc, accentArea, stampList, scheduleTable, scheduleContentBlock, scheduleLine, schedulePlace, iconNav } from "@/app/styles/layouts.css";
import { icon, defaultH2, defaultP } from "@/app/styles/others.css";
import { main } from "@/app/styles/layouts.css";
import { button, iconButton } from "@/app/styles/buttons.css";
import { cookies } from "next/headers";
import { stamps } from "../home/page";
import { user, festival } from "@/app/data/dummy";
import Link from "next/link";
import DialogLink from "@/app/components/DialogLink";

export default function Page() {
    const session_original = cookies().get("access");

    console.log(session_original)

    const session = {
        user : true
    }

    return (
        <>
        {(session && session.user) ? (
            <main className={main({ center: false })}>
                <section>
                    <h2 className={defaultH2()}>참여 활동</h2>
                    <p className={iconNav}>
                        <span>
                            모은 스탬프 <span className={defaultP({ style: "secondary" })}>{user.event.stamps}</span>/{festival.max_stamp}
                        </span>
                        <button type="button" className={`${iconButton()} ${icon({ color: "disabled" })} material-symbols-rounded`}>
                            autorenew
                        </button>
                    </p>
                    <div className={accentArea()}>
                        <div className={stampList}>
                            {stamps(user, festival)}
                        </div>
                    </div>
                    <p className={iconNav}>
                        <span className={`${
                            icon({ color: user.event.stamps === festival.max_stamp ? "notice" : "disabled" })
                            } material-symbols-rounded`}>
                            {user.event.stamps === festival.max_stamp ? "check_circle" : "circle"}
                        </span>
                        {user.event.stamps < festival.max_stamp ? (
                            <span>
                                <span className={defaultP({ style: "secondary", weight: "semiBold" })}>
                                    {festival.max_stamp - user.event.stamps}
                                </span>
                                개 더 모으면 폐회식 상품 추첨 대상이에요
                            </span>
                        ): (
                            <span>
                                폐회식 <span className={defaultP({ weight: "bold" })}>상품 추첨 대상</span>이에요
                            </span>
                        )}
                    </p>
                </section>
                <section>
                    <h3>참여 이력</h3>
                    <p>
                        QR코드로 인증할 수 없는 활동과 중복 참여한 활동은 집계되지 않아요.
                        <DialogLink icon="help" type="error" message="참여 후에도 이력이 보이지 않나요?">
                            <p className={defaultP({ align: "center" })}>
                            동일 성격의 행사는 다른 학과더라도 1개의 스탬프만 인정하고 있어요. 또한, 폐회식은 스탬프에 포함되지 않으니 유의하세요.
                            <br /><br />
                            더 궁금한 사항이 있다면 SW융합대학 학사지원팀이나 각 학과 학사지원팀에 문의할 수 있어요.
                            </p>
                            <Link href="tel:041-530-1472" className={button()} target="_blank">단과대 학사지원팀 문의</Link>
                        </DialogLink>
                    </p>
                    <ul className={scheduleTable}>
                        {festival.schedule.filter((event) => user.event.stamp.includes(event.secureId)).map((event) => (
                            <li key={event.secureId}><Link href={`/schedule/${event.secureId}`} className={scheduleLine}>
                            <div className={scheduleContentBlock}>
                                <p className={defaultP({ size: "lg", width: "time", align: "center", flexOptions: "notShrink" })}>
                                {event.startTime instanceof Date ? <>{new Intl.DateTimeFormat("ko-KR", {
                                    timeStyle: "short",
                                    hourCycle: "h23"
                                }).format(event.startTime)}</> : event.startTime}
                                </p>
                                <p className={defaultP({ size: "lg" })}>
                                    <span className={defaultP({ size: "sm", style: "disabled", width: "block" })}>
                                        {event.major} {event.categoryMessage}
                                    </span>
                                    {event.name}
                                </p>
                            </div>
                            <div className={scheduleContentBlock}>
                                <p className={`${schedulePlace} ${defaultP({ size: "lg", style: "disabled" })}`}>
                                    <span className={defaultP({ size: "sm", style: "disabled" })}>{event.building}</span>
                                    {event.location}
                                </p>
                            </div>
                        </Link></li>
                        ))}
                    </ul>
                </section>
            </main>
        ):(
            <main className={main({ center: true, verticalCenter: true })}>
                <section className={mainSection}>
                    <div className={iconDesc}>
                        <span className={`${icon({ color: "disabled" })} material-symbols-rounded`}>
                        priority_high
                        </span>
                        <h2 className={defaultH2({ style: "disabled" })}>로그인 부탁드려요</h2>
                        <p className={defaultP({ style: "disabled" })}>로그인한 사용자는 스탬프 현황을 조회할 수 있어요</p>
                        <a href="/" className={button({ types: "secondary" })}>홈으로 돌아가기</a>
                    </div>
                </section>
            </main>
        )}
        </>
    )
};
