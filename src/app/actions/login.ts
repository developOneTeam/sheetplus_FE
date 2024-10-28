"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Login(email: string, code: string, type: string, contest: string) {
    const rToken = cookies().get("refreshToken");

    if (rToken) {
        const dataReq = await fetch(`${process.env.API_ENDPOINT}/public/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "refresh-token": rToken
            })
        });

        if (dataReq.ok) {
            const tokens: {
                data: {
                    accessToken: string
                }
            } = await dataReq.json();
            cookies().set("access", tokens.data.accessToken);

            redirect("/home");
        } else {
            if (type.endsWith("ADMIN")) {
                redirect("/admin");
            } else {
                redirect("/");
            }
        }
    } else {
        const dataReq = await fetch(`${process.env.API_ENDPOINT}/public/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                code: code,
                memberType: type === "super" ? "SUPER_ADMIN" : type === "admin" ? "ADMIN" : "STUDENT"
            })
        });

        console.log(email, code, type);
        console.log(dataReq.status);
    
        if (dataReq.ok) {
            const tokens: {
                data: {
                    accessToken: string
                }
            } = await dataReq.json();
            
            cookies().set("access", tokens.data.accessToken);

            redirect(`/admin/${contest}/dashboard`);
        } else {
            console.log(await dataReq.text());

            return {
                error: "로그인에 실패했어요."
            }
        }    
    }
}