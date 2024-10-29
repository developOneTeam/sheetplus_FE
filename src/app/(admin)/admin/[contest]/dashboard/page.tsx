import Chart from "@/app/components/Chart";
import ContestList from "@/app/components/SuperAdmin/ContestList";
import { accentArea, adminDashboard, adminDashboardItem, scheduleContentBlock, scheduleLine, schedulePlace, scheduleTable } from "@/app/styles/layouts.css";
import { adminDashboardLink, defaultH2, defaultH3, defaultP, faqLink } from "@/app/styles/others.css";
import "@toast-ui/chart/dist/toastui-chart.min.css";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function AdminDashboard({ params } : { params: { contest : string } }) {
    let data = undefined;

    if (params.contest !== "all") {
        const dataReq = await fetch(`${process.env.API_ENDPOINT}/private/admin/${params.contest}/home`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies().get("access")?.value}`
            }
        });
    
        if (dataReq.ok) {
            data = await dataReq.json();
            console.log(data);
        }    
    }

    function contestDate(start: string, end: string) {
        const sDate = new Date(start);
        const eDate = new Date(end);
        const now = new Date(Date.now());

        if (sDate > now) {
            return "시작 전";
        } else if (eDate < now) {
            return "종료"
        } else {
            return "진행 중"
        }
    }

    return (
        <main>
        {params.contest !== "all" ? 
            <div className={adminDashboard}>
            <section className={accentArea()}>
                <h2 className={defaultH2()}>
                    <Link href="../manageDraw" className={adminDashboardLink}>
                    <span className={
                        defaultP({ size: "sm", style: "disabled", width: "block", weight: "semiBold" })
                    }>
                        가입 학생 {data ? data.data.memberCounts : 0}명 중
                    </span>
                    <span className={defaultH2({ style: "primary" })}>
                        {data ? data.data.moreThanFiveCounts : 0}
                    </span>
                    명이 스탬프 미션을 완료했어요! →
                    </Link>
                </h2>
                <Chart data={[
                    {
                        name: '미달성 학생',
                        data: data ? parseInt(data.data.memberCounts) - parseInt(data.data.moreThanFiveCounts) : 50,
                    },
                    {
                        name: "5개 이상",
                        data: data ? parseInt(data.data.moreThanFiveCounts) : 5
                    }
                ]} />
            </section>
            <section className={adminDashboardItem}>
                <h2 className={defaultH2()}>
                    <Link href="../manageInfo" className={adminDashboardLink}>
                        행사 운영 →
                    </Link>
                </h2>
                <h3 className={defaultH3}>
                    <span>{data.data.contestName}</span>&nbsp;
                    {contestDate(data.data.contestStart, data.data.contestEnd)}
                </h3>
                <ul className={scheduleTable({ nomargin: true })}>
                    <li className={scheduleLine}>
                        <div className={scheduleContentBlock}>
                            <p className={`${schedulePlace} ${defaultP({ size: "lg" })}`}>일시</p>
                            <span>{data.data.contestStart} ~ <br />{data.data.contestEnd}</span>
                        </div>
                        <Link href="../manageInfo" className={faqLink({ underline: false })}>수정하기 →</Link>
                    </li>
                    <li className={scheduleLine}>
                        <div className={scheduleContentBlock}>
                            <p className={`${schedulePlace} ${defaultP({ size: "lg" })}`}>장소</p>
                            <span>{data.data.locationName ?? "장소를 아직 지정하지 않았어요"} 
                                {parseInt(data.data.locationCounts) > 0 ? 
                                    <span>외 {data.data.locationCounts}곳</span> : ""}
                            </span>
                        </div>
                        <Link href="../manageInfo" className={faqLink({ underline: false })}>수정하기 →</Link>
                    </li>
                    <li className={scheduleLine}>
                        <div className={scheduleContentBlock}>
                            <p className={`${schedulePlace} ${defaultP({ size: "lg" })}`}>이벤트</p>
                            <span>출석 이벤트<br /> 
                                잔여 <span className={defaultP({ style: "primary", weight: "semiBold" })}>{data.data.remainEvents}</span>개
                                종료 <span className={defaultP({ style: "secondary", weight: "semiBold" })}>{data.data.finishEvents}</span>개
                                불가 <span className={defaultP({ style: "error", weight: "semiBold" })}>{data.data.notTodayEvents}</span>개
                            </span>                            
                        </div>
                        <Link href="../manageEvents" className={faqLink({ underline: false })}>수정하기 →</Link>
                    </li>
                    <li className={scheduleLine}>
                        <div className={scheduleContentBlock}>
                            <p className={`${schedulePlace} ${defaultP({ size: "lg" })}`}>작품</p>
                            <span>기능 준비 중</span>
                        </div>
                        <Link href="../manageWorks" className={faqLink({ underline: false })}>수정하기 →</Link>
                    </li>
 
                </ul>
                
            </section>
            <section className={adminDashboardItem}>

            </section>
            <section className={adminDashboardItem}>

            </section>
            </div>
        :
            <section>
                <h2 className={defaultH2()}>행사 목록</h2>
                <ContestList />
            </section>
        }
        
        </main>
    )
}

