import { iconDesc, main, mainSection } from "../styles/layouts.css";
import { icon, defaultH2, defaultP } from "../styles/others.css";

export default function Page() {
    return (
        <main className={main({ center: true })}>
            <section className={mainSection}>
                <div className={iconDesc}>
                    <span className={`${icon({ color: "disabled" })} material-symbols-rounded`}>
                    deployed_code_history
                    </span>
                    <h2 className={defaultH2({ style: "disabled" })}>준비 중이에요</h2>
                    <p className={defaultP({ style: "disabled" })}>작품 탐색 기능을 준비하고 있어요</p>
                </div>
            </section>
        </main>
    )
};
