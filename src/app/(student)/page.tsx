import Link from "next/link";
import DialogLink from "../components/DialogLink";
import LoginForm from "../components/LoginForm";
import { button } from "../styles/buttons.css";
import { accentArea, iconDesc, main, mainSection } from "../styles/layouts.css";
import { defaultH2, defaultP, icon } from "../styles/others.css";

export default function Home() {

  return (
    <>
      <main className={main({ center: true })}>
        <section className={mainSection}>
          <div className={iconDesc}>
            <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>
              forward_to_inbox
            </span>
            <h2 className={defaultH2()}>이메일로 입장하기</h2>
            <p className={defaultP()}>SW융합대학 학부생만 참여할 수 있어요</p>
          </div>
          <LoginForm />
          <div className={accentArea({ center: true })}>
            <p className={defaultP({ size: "sm" })}>이메일 주소를 입력하시면 <br /> 로그인 혹은 가입할 수 있는 링크를 보내드려요.</p>
          </div>
          <DialogLink icon="help" type="error" message="이메일 주소가 기억나지 않나요?">
              <p className={defaultP({ align: "center" })}>
              사전에 연동해두셨다면 포털 로그인 후 &#39;웹메일&#39; - &#39;환경설정&#39;에서 아이디를 찾을 수 있어요. 찾을 수 없다면 계정 삭제 가능성이 있으니 전산팀에 문의해보세요.
              </p>
              <Link href="https://portal.sch.ac.kr" className={button()} target="_blank">순천향대 포털에서 확인하기</Link>
              <Link href="tel:041-530-1411" className={button({ types: "secondary" })}>전산팀에 전화하기</Link>
          </DialogLink>
        </section>
      </main>
    </>
  );
}

