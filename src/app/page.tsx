import LoginForm from "./components/LoginForm";
import { signIn } from "@/auth";
import { accentArea, formLayout, iconDesc, main, mainSection } from "./styles/layouts.css";
import { defaultH2, defaultP, faqLink, icon } from "./styles/others.css";

export default function Home() {


  return (
    <>
      <main className={main({ center: true })}>
        <section className={mainSection}>
          <div className={iconDesc}>
            <span className={`${icon} material-symbols-rounded`}>
              forward_to_inbox
            </span>
            <h2 className={defaultH2}>이메일로 입장하기</h2>
            <p className={defaultP()}>SW융합대학 학부생만 참여할 수 있어요</p>
          </div>
          <form className={formLayout} action={async(formData) => {
            "use server"
            formData.set("email", `${formData.get("email")}@sch.ac.kr`);
            await signIn("mailgun", formData);
          }}>
            <LoginForm />
          </form>
          <div className={accentArea({ center: true })}>
            <p className={defaultP({ size: "sm" })}>이메일 주소를 입력하시면 <br /> 로그인 혹은 가입할 수 있는 링크를 보내드려요.</p>
          </div>
          <a className={faqLink} href="/">이메일 주소가 기억나지 않나요?</a>
        </section>
      </main>
    </>
  );
}

export const runtime = 'edge';
