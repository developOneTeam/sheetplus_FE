import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;

    if (request.cookies.has("access") && request.cookies.has("refresh")) {
        const rToken = request.cookies.get("refresh");

        const getNewToken = await fetch(`${process.env.API_ENDPOINT}/public/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "refresh-token": rToken
            })
        });

        console.log("preparing for response");

        let response = null;
        
        if (currentPath === "/") {
            response = NextResponse.redirect(new URL("/home", request.url));
        } else {
            response = NextResponse.next();
        }
        
        if (getNewToken.ok) {
            const tokens = await getNewToken.json();

            response.cookies.set("access", tokens.data.accessToken);
            response.cookies.set("refresh", tokens.data.refreshToken);
        } else {
            response.cookies.delete("access");
            response.cookies.delete("refresh");
        }

        return response;
    }
}

export const config = {
    matcher: ["/admin/:path*", "/activities/:path", "/home", "/"]
}