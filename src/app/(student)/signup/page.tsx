import SignUpForm from "@/app/components/SignUpForm";
import { accentArea, iconDesc, main, mainSection } from "@/app/styles/layouts.css";
import { defaultH2, defaultP, icon } from "@/app/styles/others.css";

export default function Page({ searchParams } : {
    searchParams: { email: string|undefined, code: string|undefined }
} ) {
    return (
        <main className={main({ center: true, verticalCenter: true })}>
        <section className={mainSection}>
          <div className={iconDesc}>
            <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>
              check_circle
            </span>
            <h2 className={defaultH2()}>이메일 인증을 완료했어요</h2>
            <p className={defaultP()}>이어서 정보 입력을 진행할게요</p>
          </div>
          <SignUpForm mail={searchParams.email} code={searchParams.code} />
          <div className={accentArea({ center: true })}>
            <p className={defaultP({ size: "sm" })}>인증받은 이메일을 꼭 기억해주세요!</p>
          </div>
        </section>
      </main>
    )
};
