"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Login(email: string, code: string, type: string, contest: string) {
    const rToken = cookies().get("refreshToken");

    if (rToken && rToken.value !== "") {
        const dataReq = await fetch(`${process.env.API_ENDPOINT}/public/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "refreshToken": rToken.value
            }
        });

        if (dataReq.ok) {
            const tokens: {
                data: {
                    accessToken: string,
                    refreshToken: string
                }
            } = await dataReq.json();
            cookies().set("access", tokens.data.accessToken, {
                secure: true,
                httpOnly: true,
                sameSite: true
            });
            cookies().set("refreshToken", tokens.data.refreshToken, {
                secure: true,
                httpOnly: true,
                sameSite: true
            });

            if (type !== "student") {
                redirect(`/admin/${contest}/dashboard`);
            } else {
                redirect("/2/home");
            }
        } else {
            if (type === "super" || type === "admin") {
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
    
        if (dataReq.ok) {
            const tokens: {
                data: {
                    accessToken: string,
                    refreshToken: string,
                    memberInfo: {
                        memberType: string
                    }
                }
            } = await dataReq.json();
            
            cookies().set("access", tokens.data.accessToken, {
                secure: true,
                httpOnly: true,
                sameSite: true
            });
            cookies().set("refreshToken", tokens.data.refreshToken, {
                secure: true,
                httpOnly: true,
                sameSite: true
            });

            console.log(tokens);

            if (tokens.data.memberInfo.memberType === "STUDENT") {
                redirect(`/2/home`);
            } else {
                redirect(`/admin/${contest}/dashboard`);
            }
        } else {
            console.log(dataReq.status);

            return {
                error: "로그인에 실패했어요."
            }
        }    
    }
}