import { mainSection, iconDesc, accentArea, stampList, scheduleTable, scheduleContentBlock, scheduleLine, schedulePlace, iconNav } from "@/app/styles/layouts.css";
import { icon, defaultH2, defaultP, defaultH3 } from "@/app/styles/others.css";
import { main } from "@/app/styles/layouts.css";
import { button, iconButton } from "@/app/styles/buttons.css";
import { cookies } from "next/headers";
import Link from "next/link";
import DialogLink from "@/app/components/DialogLink";
import stamps from "@/app/components/Stamps";
import { Schedule } from "@/app/types/common";

export default async function Page({ params } : { params: { contest : string } }) {
    const accessToken = cookies().get("access");

    let festival = null;

    if (accessToken) {
        const dataReqHome = await fetch(`${process.env.API_ENDPOINT}/private/student/${params.contest}/activities`, {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${accessToken.value}`
            }
        });
    
        if (dataReqHome.ok) {
            const dataHome = await dataReqHome.json();
            festival = dataHome.data;
        }
    }

    return (
        <>
        {(accessToken && festival) ? (
            <main className={main({ center: false })}>
                <section>
                    <h2 className={defaultH2({ style: "nomargin" })}>참여 활동</h2>
                    <p className={`${iconNav} ${defaultP({ margin: false })}`}>
                        <span>
                            모은 스탬프 <span className={defaultP({ style: "secondary" })}>{festival.eventCounts}</span>/5
                        </span>
                        <button type="button" className={`${iconButton()} ${icon({ color: "disabled" })} material-symbols-rounded`}>
                            autorenew
                        </button>
                    </p>
                    <div className={accentArea()}>
                        <div className={stampList}>
                            {stamps(festival)}
                        </div>
                    </div>
                    <p className={iconNav}>
                        <span className={`${
                            icon({ color: festival.eventCounts === 5 ? "notice" : "disabled" })
                            } material-symbols-rounded`}>
                            {festival.eventCounts === 5 ? "check_circle" : "circle"}
                        </span>
                        {festival.eventCounts < 5 ? (
                            <span>
                                <span className={defaultP({ style: "secondary", weight: "semiBold" })}>
                                    {5 - festival.eventCounts}
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
                    <h3 className={defaultH3}>참여 이력</h3>
                    <p className={defaultP()}>
                        QR코드로 인증할 수 없는 활동과 중복 참여한 활동은 집계되지 않아요
                    </p>
                    <DialogLink icon="help" type="error" message="그래도 이력이 보이지 않나요?">
                        <p>
                        동일 성격의 행사는 다른 학과더라도 1개의 스탬프만 인정하고 있어요. 또한, 폐회식은 스탬프에 포함되지 않으니 유의하세요.
                        <br /><br />
                        더 궁금한 사항이 있다면 SW융합대학 학사지원팀이나 각 학과 학사지원팀에 문의할 수 있어요.
                        </p>
                        <Link href="tel:041-530-1472" className={button()} target="_blank">단과대 학사지원팀 문의</Link>
                    </DialogLink>
                    <ul className={scheduleTable()}>
                        {festival.events.filter((event:Schedule) => (
                            <li key={event.secureId}><Link href={`/schedule/${event.secureId}`} className={scheduleLine}>
                            <div className={scheduleContentBlock}>
                                <p className={defaultP({ size: "lg", width: "time", align: "center", flexOptions: "notShrink" })}>
                                    {event.startTime.split(" ")[1].split(":")[0]}:{event.startTime.split(" ")[1].split(":")[1]}
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
