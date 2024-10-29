"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Signup(status: { ok: boolean, try: number, notSelected: boolean }, formData:FormData) {
    const rToken = cookies().get("refreshToken");
    const rTokenOnForm = formData.get("refreshToken");
    const admin = formData.get("admin");
    const contest = formData.get("contest");

    const cookieBox = cookies();

    if (admin !== "student" && contest === "") {
        status.ok = false;
        status.notSelected = true;

        return status;    
    }

    if ((rToken && rToken.value !== "") || rTokenOnForm) {

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
                    accessToken: string,
                    refreshToken: string
                }
            } = await getNewToken.json();
            cookieBox.set("access", tokens.data.accessToken, {
                secure: true,
                httpOnly: true,
                sameSite: true
            });
            cookieBox.set("refreshToken", tokens.data.refreshToken, {
                secure: true,
                httpOnly: true,
                sameSite: true
            });
        }
        if (admin !== "STUDENT" && contest) {
            redirect(`/admin/${contest}/dashboard`);
        } else {
            redirect("/2/home");
        }
    } else {
        const registerReq = await fetch(`${process.env.API_ENDPOINT}/public/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "studentId": formData.get("studentId"),
                "name": formData.get("name"),
                "major": formData.get("major"),
                "universityEmail": formData.get("email"),
                "memberType": admin === "super" ? 
                    "SUPER_ADMIN" : admin === "admin" ? "ADMIN":"STUDENT",
                "code": formData.get("code")
            })
        });

        console.log(JSON.stringify({
            "studentId": formData.get("studentId"),
            "name": formData.get("name"),
            "major": formData.get("major"),
            "universityEmail": formData.get("email"),
            "memberType": admin === "super" ? 
                "SUPER_ADMIN" : admin === "admin" ? "ADMIN":"STUDENT",
            "code": formData.get("code")
        }));

        if (registerReq.ok) {
            status.ok = true;
            const tokens = await registerReq.json();
            cookieBox.set("access", tokens.data.accessToken, {
                secure: true,
                httpOnly: true,
                sameSite: true
            });
            cookieBox.set("refreshToken", tokens.data.refreshToken, {
                secure: true,
                httpOnly: true,
                sameSite: true
            });

        } else {
            status.ok = false;
            console.log(registerReq.status);
        }
    
        status.try += 1
    
        return status;    
    }
}
