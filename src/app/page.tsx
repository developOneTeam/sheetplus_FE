import { AccentArea, FaqLink, Form, Header, IconButton, IconDesc, Main } from "./styles/ui";
import "./page.css";
import LoginForm from "./components/LoginForm";
import { signIn } from "@/auth";

export default function Home() {


  return (
    <>
      <Header>
        <h1 className="title">
          SCHU<span className="sheet">sheet<sup>+</sup></span>
          <span className="subtitle">제1회 SW융합대학 학술제</span>
        </h1>
        <section className="icon-nav">
          <IconButton className="material-symbols-rounded">
            notifications
          </IconButton>
        </section>
      </Header>
      <Main center>
        <section>
          <IconDesc>
            <span className="material-symbols-rounded">
              forward_to_inbox
            </span>
            <h2>이메일로 입장하기</h2>
            <p>SW융합대학 학부생만 참여할 수 있어요</p>
          </IconDesc>
          <Form action={async(formData) => {
            "use server"
            formData.set("email", `${formData.get("email")}@sch.ac.kr`);
            await signIn("mailgun", formData);
          }}>
            <LoginForm />
          </Form>
          <AccentArea center size="sm">
            <p>이메일 주소를 입력하시면 <br /> 로그인 혹은 가입할 수 있는 링크를 보내드려요.</p>
          </AccentArea>
          <FaqLink href="/">이메일 주소가 기억나지 않나요?</FaqLink>
        </section>
      </Main>
    </>
  );
}

export const runtime = 'edge';
