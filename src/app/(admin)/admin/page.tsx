import Link from "next/link";
import DialogLink from "../../components/DialogLink";
import { button } from "../../styles/buttons.css";
import { main, mainSection } from "../../styles/layouts.css";
import { defaultP, faqLink } from "../../styles/others.css";
import AdminLogin from "@/app/components/Admin/AdminLogin";

export default async function Home() {
    let list = null;
    const dataReq = await fetch(`${process.env.API_ENDPOINT}/public/contest/read`, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (dataReq.ok) {
        list = await dataReq.json();
        list = list.data;
    }

    return (
        <>
            <main className={main({ center: true, verticalCenter: true })}>
                <section className={mainSection}>
                    <AdminLogin list={list} />
                    <DialogLink icon="help" type="error" message="이메일 주소가 기억나지 않나요?">
                        <p className={defaultP({ align: "center" })}>
                        사전에 연동해두셨다면 포털 로그인 후 &#39;웹메일&#39; - &#39;환경설정&#39;에서 아이디를 찾을 수 있어요. 찾을 수 없다면 계정 삭제 가능성이 있으니 전산팀에 문의해보세요.
                        </p>
                        <Link href="https://portal.sch.ac.kr" className={button()} target="_blank">순천향대 포털에서 확인하기</Link>
                        <Link href="tel:041-530-1411" className={button({ types: "secondary" })}>전산팀에 전화하기</Link>
                    </DialogLink>
                    <a href="/" className={faqLink()}>학생이신가요?</a>
                </section>
            </main>
        </>
    );
}

