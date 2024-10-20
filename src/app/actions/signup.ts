"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Signup(status: { ok: boolean, try: number, notSelected: boolean }, formData:FormData) {
    const rToken = formData.get("refreshToken") || cookies().get("refresh");
    const admin = formData.get("admin");
    const contest = formData.get("contest");

    const cookieBox = cookies();

    if (admin === "true" && !contest) {
        status.ok = false;
        status.notSelected = true;

        return status;    
    }

    if (rToken) {

        const getNewToken = await fetch(`${process.env.API_ENDPOINT}/public/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "refresh-token": rToken
            })
        });

        if (getNewToken.ok) {
            const tokens: {
                data: {
                    accessToken: string,
                    refreshToken: string
                }
            } = await getNewToken.json();
            cookieBox.set("access", tokens.data.accessToken);
            cookieBox.set("refresh", tokens.data.refreshToken);
        }
        if (admin === "true" && contest) {
            redirect(`/admin/${contest}/dashboard`);
        } else {
            redirect("/home");
        }
    } else {
        const mailAuth = await fetch(`${process.env.API_ENDPOINT}/public/mail/auth/check`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": formData.get("email"),
                "code": formData.get("code")
            })
        });
    
        if (mailAuth.ok) {
            const registerReq = await fetch(`${process.env.API_ENDPOINT}/public/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": formData.get("email"),
                    "name": formData.get("name"),
                    "major": formData.get("major"),
                    "universityEmail": formData.get("email"),
                    "memberType": admin ? "ADMIN":"STUDENT"
                })
            });

            if (registerReq.ok) {
                status.ok = true;
                const tokens = await registerReq.json();
                cookieBox.set("access", tokens.data.accessToken);
                cookieBox.set("refresh", tokens.data.refreshToken);
            }
        } else {
            status.ok = false;
        }
    
        status.try += 1
    
        return status;    
    }
}
