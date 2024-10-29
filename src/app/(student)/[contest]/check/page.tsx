import QR from "@/app/components/QR";
import { accentArea, iconDesc, main, mainSection } from "@/app/styles/layouts.css";
import { defaultH2, defaultP, icon } from "@/app/styles/others.css";
import { cookies } from "next/headers";

export default function Home() {

    return (
        <>
            <main className={main({ center: true, verticalCenter: true })}>
                <section className={mainSection}>
                    <div className={iconDesc}>
                        <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>
                            qr_code
                        </span>
                        <h2 className={defaultH2()}>QR코드로 출석 확인</h2>
                        <p className={defaultP()}>SW융합대학 학부생만 참여할 수 있어요</p>
                    </div>
                    <QR aToken={cookies().get("access")} />
                    <div className={accentArea({ center: true })}>
                        <p className={defaultP({ size: "sm" })}>행사 현장에 비치된<br />참여 인증용 QR코드를 촬영해주세요</p>
                    </div>
                </section>
            </main>
        </>
    );
}
