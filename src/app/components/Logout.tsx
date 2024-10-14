import { auth, signOut } from "@/auth";
// import { signOut } from "@/auth";
import { iconButton } from "../styles/buttons.css";
import { icon } from "../styles/others.css";

export default async function Logout() {
    const session = await auth();
    // const session = {
    //     user: true
    // }

    return(
        <>
            {session && session.user ? <form action={
                async () => {
                "use server"
                await signOut();
                }
            }>
                <button type="submit" className={`${iconButton()} ${icon} material-symbols-rounded`}>
                logout
                </button>
            </form>:""}
        </>
    );
}