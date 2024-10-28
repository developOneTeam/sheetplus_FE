"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Sendmail(status: { ok: boolean, try: number, notSelected: boolean }, formData:FormData) {
    const rToken = cookies().get("refreshToken");
    const rTokenOnForm = formData.get("refreshToken");
    const admin = formData.get("admin");
    const contest = formData.get("contest");

    if (admin && !contest) {
        status.ok = false;
        status.notSelected = true;
        status.try += 1

        return status;    
    }

    if ((rToken && rToken.value !== "") || rTokenOnForm) {
        const cookieBox = cookies();

        const getNewToken = await fetch(`${process.env.API_ENDPOINT}/public/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "refreshToken": rToken ? rToken.value : rTokenOnForm?.toString() ?? ""
            }
        });

        if (getNewToken.ok) {
            const tokens: {
                data: {
                    accessToken: string
                }
            } = await getNewToken.json();

            cookieBox.set("access", tokens.data.accessToken);

            if (admin && contest) {
                redirect(`/admin/${contest}/dashboard`);
            } else {
                redirect("/home");
            }
        } else {
            status.ok = false;
            console.log(await getNewToken.text());
            cookieBox.delete("refreshToken");

            status.try += 1
            return status;
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
