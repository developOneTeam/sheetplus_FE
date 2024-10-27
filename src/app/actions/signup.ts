"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Signup(status: { ok: boolean, try: number, notSelected: boolean }, formData:FormData) {
    const rToken = formData.get("refreshToken") || cookies().get("refreshToken");
    const admin = formData.get("admin");
    const contest = formData.get("contest");

    const cookieBox = cookies();

    if (admin !== "" && contest === "") {
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
                    accessToken: string
                }
            } = await getNewToken.json();
            cookieBox.set("access", tokens.data.accessToken);
        }
        if (admin !== "" && contest) {
            redirect(`/admin/${contest}/dashboard`);
        } else {
            redirect("/home");
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
                    "SUPER_ADMIN" : admin === "" ? "ADMIN":"STUDENT",
                "code": formData.get("code")
            })
        });

        console.log(JSON.stringify({
            "studentId": formData.get("studentId"),
            "name": formData.get("name"),
            "major": formData.get("major"),
            "universityEmail": formData.get("email"),
            "memberType": admin === "super" ? 
                "SUPER_ADMIN" : admin === "" ? "ADMIN":"STUDENT",
            "code": formData.get("code")
        }));

        if (registerReq.ok) {
            status.ok = true;
            const tokens = await registerReq.json();
            cookieBox.set("access", tokens.data.accessToken);

        } else {
            status.ok = false;
            console.log(registerReq.status);
        }
    
        status.try += 1
    
        return status;    
    }
}
