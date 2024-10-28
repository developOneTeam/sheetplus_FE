import Chart from "@/app/components/Chart";
import ContestList from "@/app/components/SuperAdmin/ContestList";
import { accentArea } from "@/app/styles/layouts.css";
import { adminDashboardLink, defaultH2, defaultP } from "@/app/styles/others.css";
import "@toast-ui/chart/dist/toastui-chart.min.css";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function AdminDashboard({ params } : { params: { contest : string } }) {
    let data = undefined;

    if (params.contest !== "all") {
        const dataReq = await fetch(`${process.env.API_ENDPOINT}/private/admin/${params.contest}/home`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies().get("access")}`
            }
        });
    
        if (dataReq.ok) {
            data = await dataReq.json();
        }    
    }

    return (
        <div>
        {params.contest !== "all" ? 
            <section className={accentArea()}>
                <h2 className={defaultH2()}>
                    <Link href="../manageDraw" className={adminDashboardLink}>
                    <span className={
                        defaultP({ size: "sm", style: "disabled", width: "block", weight: "semiBold" })
                    }>
                        가입 학생 {data ? data.data.memberCounts : 55}명 중
                    </span>
                    <span className={defaultH2({ style: "primary" })}>
                        {data ? data.moreThanFiveCounts : 5}
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
        :
            <section>
                <h2 className={defaultH2()}>행사 목록</h2>
                <ContestList />
            </section>
        }
        
        </div>
    )
}

