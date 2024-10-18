import Link from "next/link";
import DialogLink from "../../components/DialogLink";
import LoginForm from "../../components/LoginForm";
import { button } from "../../styles/buttons.css";
import { accentArea, iconDesc, main, mainSection } from "../../styles/layouts.css";
import { defaultH2, defaultP, faqLink, icon } from "../../styles/others.css";
import { cookies } from "next/headers";

export default function Home() {
    const cookieBox = cookies();

    return (
        <>
            <main className={main({ center: true, verticalCenter: true })}>
                <section className={mainSection}>
                    <div className={iconDesc}>
                        <span className={`${icon({ color: "primary" })} material-symbols-rounded`}>
                            date_range
                        </span>
                        <h2 className={defaultH2({ style: "primary" })}>관리자 로그인</h2>
                    </div>
                    <LoginForm rToken={cookieBox.get("refresh")} />
                    <a href={`/event/1/pick`} className={button({types: "secondary"})}>참석자 추첨 바로가기</a>
                    <div className={accentArea({ center: true })}>
                        <p className={defaultP({ size: "sm" })}>초대받은 이메일 주소로 <br /> 로그인할 수 있는 링크를 보내드려요.</p>
                    </div>
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

