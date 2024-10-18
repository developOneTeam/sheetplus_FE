import Draw from "@/app/components/Draw";
import { main } from "@/app/styles/layouts.css";
import { Member } from "@/app/types/common";

export default async function Page() {
    const drawMemberRequest:{
        data : Member[]
    } = await fetch(`${process.env.API_ENDPOINT}/private/admin/draw/receive/update`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "contest": 0
        })
    }).then(async (result) => await result.json());

    const dummyData:Member[] = [
        {
            id: 0,
            studentId: "20190000",
            name: "박흥부",
            major: "사물인터넷학과",
            email: "heungboo@sch.ac.kr",
            memberType: "STUDENT"
        },
        {
            id: 1,
            studentId: "20200000",
            name: "놀부",
            major: "컴퓨터소프트웨어공학과",
            email: "nolboo@sch.ac.kr",
            memberType: "STUDENT"
        },
        {
            id: 2,
            studentId: "20230000",
            major: "메타버스&게임학과",
            email: "abracatabra@sch.ac.kr",
            memberType: "STUDENT",
            name: "아브라카타브라"
        }
    ]

    return(
        <main className={main({ center: true, grid: true })}>
            <Draw members={drawMemberRequest.data ?? dummyData} />
        </main>
    )
}