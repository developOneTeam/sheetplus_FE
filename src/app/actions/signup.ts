"use server"

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function Login(status: { ok: boolean, try: number }, formData:FormData) {
    const cookieBox = cookies()

    const result = await fetch(`${process.env.API_ENDPOINT}/public/mail/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": formData.get("name"),
            "studentId": formData.get("studentId"),
            "major": formData.get("major"),
            "universityEmail": formData.get("email"),
            "memberType": "STUDENT"
        })
    });

    if (result.ok) {
        status.ok = true;
        const tokens: {
            data: {
                accessToken: string,
                refreshToken: string
            }
        } = await result.json();
        cookieBox.set("access", tokens.data.accessToken);
        cookieBox.set("refresh", tokens.data.refreshToken);

        redirect("/")
    } else
        status.ok = false;

    status.try += 1

    return status;
}
