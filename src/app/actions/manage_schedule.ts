"use server";

import { cookies } from "next/headers";

export async function ManageSchedule(info : { type: string, ok: boolean, refresh: boolean, contest: string }, formData?: FormData) {
    const aToken = cookies().get("access");

    if (info.type === "get") {
        const dataReq = await fetch(`${process.env.API_ENDPOINT}/public/${info.contest}/schedule`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        if (dataReq.ok) {
            const fullData = await dataReq.json();
            return fullData.data;
        } else {
            info.ok = false;
            info.refresh = true;
            return info
        }
    } else if (info.type === "create" && formData) {
        const dataReq = await fetch(`${process.env.API_ENDPOINT}/private/admin/contest/${info.contest}/event/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${aToken?.value}`
            },
            body: JSON.stringify({
                "name": formData.get("eName"),
                "startTime": `${formData.get("startTime")}:00`,
                "endTime": `${formData.get("endTime")}:00`,
                "condition": "EVENT_BEFORE",
                "location": formData.get("room"),
                "building": formData.get("building"),
                "speakerName": formData.get("speaker"),
                "major": formData.get("major"),
                "eventType": formData.get("stamp"),
                "category": formData.get("eventType")
            })
        });

        if(dataReq.ok) {
            info.ok = true;
            info.refresh = true;
            return info;
        } else {
            console.log(dataReq.status);
            console.log(await dataReq.json());
            console.log(JSON.stringify({
                "name": formData.get("eName"),
                "startTime": `${formData.get("startTime")}:00`,
                "endTime": `${formData.get("endTime")}:00`,
                "condition": "EVENT_BEFORE",
                "location": formData.get("room"),
                "building": formData.get("building"),
                "speakerName": formData.get("speaker"),
                "major": formData.get("major"),
                "eventType": formData.get("stamp"),
                "category": formData.get("eventType")
            }));
            info.ok = false;
            return info;
        }
    } else if (info.type === "update" && formData) {
        const dataReq = await fetch(`${process.env.API_ENDPOINT}/private/admin/event/${formData.get("eventId")}/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${aToken?.value}`
            },
            body: JSON.stringify({
                "name": formData.get("eName"),
                "startTime": `${formData.get("startTime")}:00`,
                "endTime": `${formData.get("endTime")}:00`,
                "condition": formData.get("status"),
                "location": formData.get("room"),
                "building": formData.get("building"),
                "speakerName": formData.get("speaker"),
                "major": formData.get("major"),
                "eventType": formData.get("stamp"),
                "category": formData.get("eventType")
            })
        });

        if(dataReq.ok) {
            info.ok = true;
            info.refresh = true;
            return info;
        } else {
            info.ok = false;
            return info;
        }
    } else if (info.type === "delete" && formData) {
        const dataReq = await fetch(`${process.env.API_ENDPOINT}/private/admin/event/${formData.get("eventId")}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${aToken?.value}`
            }
        });

        if(dataReq.ok) {
            info.ok = true;
            info.refresh = true;
            return info;
        } else {
            info.ok = false;
            return info;
        }
    }
}