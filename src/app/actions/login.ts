"use server"

export async function Login(status: { ok: boolean, try: number }, formData:FormData) {
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
