"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Sendmail(status: { ok: boolean, try: number, notSelected: boolean }, formData:FormData) {
    const rToken = formData.get("refreshToken") || cookies().get("refreshToken");
    const admin = formData.get("admin");
    const contest = formData.get("contest");

    if (admin && !contest) {
        status.ok = false;
        status.notSelected = true;

        return status;    
    }

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
                    accessToken: string
                }
            } = await getNewToken.json();
            cookieBox.set("access", tokens.data.accessToken);
        }
        if (admin && contest) {
            redirect(`/admin/${contest}/dashboard`);
        } else {
            redirect("/home");
        }
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
        else {
            status.ok = false;
            console.log(await result.text());
        }

        status.try += 1
    
        return status;    
    }
}
