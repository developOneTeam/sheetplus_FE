
import { cookies } from "next/headers";
import { iconButton } from "../styles/buttons.css";
import { icon } from "../styles/others.css";

export default async function Logout() {
    const aToken = cookies().get("access");
    const rToken = cookies().get("refresh");

    return(
        <>
            {rToken && aToken ? <form action={
                async () => {
                "use server"
                    cookies().delete("access");
                    cookies().delete("refresh");
                }
            }>
                <button type="submit" className={`${iconButton()} ${icon} material-symbols-rounded`}>
                logout
                </button>
            </form>:""}
        </>
    );
}