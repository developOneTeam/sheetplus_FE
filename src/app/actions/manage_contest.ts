"use server";

import { cookies } from "next/headers";

export async function ManageContest(info : { type: string, ok: boolean}, formData?: FormData) {
    const aToken = cookies().get("access");

    if (info.type === "get") {
        const dataReq = await fetch(`${process.env.API_ENDPOINT}/public/contest/read`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        if (dataReq.ok) {
            const fullData = await dataReq.json();
            return fullData.data;
        } else {
            info.ok = false;
            return info
        }
    } else if (info.type === "create" && formData) {
        const dataReq = await fetch(`${process.env.API_ENDPOINT}/private/admin/contest/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${aToken?.value}`
            },
            body: JSON.stringify({
                "name": formData.get("cName"),
                "startDateTime": `${formData.get("startDate")}:00`,
                "endDateTime": `${formData.get("endDate")}:00`,
                "condition": "EVENT_BEFORE"
            })
        });

        console.log(dataReq.status);

        if(dataReq.ok) {
            info.ok = true;
            return info;
        } else {
            info.ok = false;
            return info;
        }
    }
}