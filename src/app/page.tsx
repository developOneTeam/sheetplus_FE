import Image from "next/image";
import styles from "./page.module.css";
import { signIn } from "./api/auth";

export default function Home() {
  return (
    <form action={async(formData) => {
      "use server"
      formData.set("email", `${formData.get("email")}@sch.ac.kr`);
      await signIn("mailgun", formData);
    }}>
      <input type="text" name="email" placeholder="Email" />
      <label htmlFor="email">@sch.ac.kr</label>
      <button type="submit">Sign In</button>
    </form>
  );
}

export const runtime = 'edge';
