"use server"
import { signIn } from "@/auth";

export async function Login(formData:FormData) {
    formData.set("email", `${formData.get("email")}@sch.ac.kr`);
    await signIn("mailgun", formData);
}
