import { D1Adapter } from "@auth/d1-adapter";
import { getRequestContext } from "@cloudflare/next-on-pages";
import NextAuth from "next-auth";
import Mailgun from "next-auth/providers/mailgun";

export const { handlers, signIn, signOut, auth } = NextAuth(() => {
    const db = getRequestContext().env.TEST_DB;
    
    return {
        providers: [
            Mailgun({
                apiKey: process.env.AUTH_MAILGUN_KEY,
                from: "schusheetp@mail.mysw.moe"
            })
        ],
        adapter: D1Adapter(db),
    }
});

export const runtime = 'edge';
