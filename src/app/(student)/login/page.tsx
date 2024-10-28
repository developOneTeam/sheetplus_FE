"use client";

import { Login } from "@/app/actions/login";
import { button } from "@/app/styles/buttons.css";
import { iconDesc } from "@/app/styles/layouts.css";
import { icon, defaultH2, defaultP } from "@/app/styles/others.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ searchParams } : {
        searchParams: { email: string|undefined, code: string|undefined }
} ) {
    const [memberType, setMemberType] = useState<string|null>(null);
    const [contest, setContest] = useState<string|null>(null);
    const [request, setRequest] = useState<{ error: string }|null>(null);
    const email = searchParams.email;
    const code = searchParams.code;
    

    useEffect(() => {
        setMemberType(localStorage.getItem("member_type"));
        setContest(localStorage.getItem("contest"));
    }, []);

    useEffect(() => {
        async function tryLogin() {
            if (email && code && contest && memberType) {
                setRequest(await Login(email, code, memberType, contest));
            }
        }

        tryLogin();
    }, [memberType, contest, code, email]);

    return (
        <section>
            {request && request.error ? 
                <div className={iconDesc}>
                    <span className={`${icon({ color: "error" })} material-symbols-rounded`}>
                        live_help
                    </span>
                    <h2 className={defaultH2()}>{request.error}</h2>
                    <p className={defaultP()}>메일 수신 후 너무 오랜 시간이 지났을 수 있어요. 다시 돌아가서 시도해보세요.</p>
                    <Link href={memberType ? "/admin" : "/"} className={button({ types: "secondary" })}>홈으로 돌아가기</Link>
                </div>
            :""}
        </section>
    )
}