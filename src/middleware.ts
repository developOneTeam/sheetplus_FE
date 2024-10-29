import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;

    console.log("requesting service");

    if (request.cookies.has("access")) {
        const rToken = request.cookies.get("refreshToken");

        if (rToken && rToken.value !== "") {

            const getNewToken = await fetch(`${process.env.API_ENDPOINT}/public/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "refreshToken": rToken.value
                }
            });
            
            let response = null;

            if (getNewToken.ok) {
                if (currentPath === "/") {
                    response = NextResponse.redirect(new URL("/home", request.url));
                } else {
                    response = NextResponse.next();
                }

                const tokens = await getNewToken.json();

                response.cookies.set("access", tokens.data.accessToken, {
                    secure: true,
                    httpOnly: true,
                    sameSite: true
                });
                response.cookies.set("refreshToken", tokens.data.refreshToken, {
                    secure: true,
                    httpOnly: true,
                    sameSite: true
                });
            } else {

                console.log(await getNewToken.json());
                if (currentPath.includes("admin")) {
                    response = NextResponse.redirect(new URL("/admin", request.url))
                } else {
                    response = NextResponse.redirect(new URL("/", request.url))
                }
                
                response.cookies.delete("access");
                response.cookies.delete("refreshToken");
            }

            return response;
        } else {
            if (currentPath.includes("admin")) {
                return NextResponse.redirect(new URL("/admin", request.url))
            } else {
                return NextResponse.redirect(new URL("/", request.url))
            }
        }
    } else {
        return NextResponse.next();
    }    
}

export const config = {
    matcher: ["/admin/:path*", "/activities/:path", "/home", "/"]
}