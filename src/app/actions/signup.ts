"use server"

export async function Login(status: { ok: boolean, try: number }, formData:FormData) {

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

    if (result.ok)
        status.ok = true;
    else
        status.ok = false;

    status.try += 1

    return status;
}