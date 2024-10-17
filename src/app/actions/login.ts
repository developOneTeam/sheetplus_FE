"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Login(status: { ok: boolean, try: number }, formData:FormData) {
    const rToken = formData.get("refreshToken");

    if (rToken) {
        const cookieBox = cookies();

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
        redirect("/home");
    } else {
        formData.set("email", `${formData.get("email")}@sch.ac.kr`);

        const result = await fetch(`${process.env.API_ENDPOINT}/public/mail/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "receiver": formData.get("email")
            })
        });
    
        if (result.ok)
            status.ok = true;
        else
            status.ok = false;
    
        status.try += 1
    
        return status;    
    }
}
