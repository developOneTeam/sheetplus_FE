"use client"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { qrBoxLayout } from "../styles/layouts.css";
import { defaultP } from "../styles/others.css";
import Dialog from "./Dialog";
import Link from "next/link";
import { button } from "../styles/buttons.css";
import { useRouter } from "next/navigation";

export default function QR({ aToken, params }: { aToken?: RequestCookie , params?: { code: string }}) {
    const scanContainer = useRef<HTMLDivElement>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [checkOk, setCheckOk] = useState<boolean>(false);
    const router = useRouter();

    async function checkCode(code: string) {
        if (!aToken) {
            router.push("/activities")
        }

        const checkReq = await fetch(`${process.env.API_ENDPOINT}/private/student/qrcode/check`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${aToken?.value}`
                },
                body: JSON.stringify({
                    secureCode: code
                })
            }
        );

        if (checkReq.ok) {
            setCheckOk(true);
            setDialogOpen(true);
        }
    }

    useEffect(() => {
        async function createCamera() {
            const scanner = new Html5Qrcode(scanContainer.current ? scanContainer.current.id : "",
                {
                    formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ],
                    verbose: false
                }
            );
            
            await scanner.start({
                facingMode: "environment"
            }, {
                fps: 30
            }, async (decodedText) => {
                scanner.pause();
                const url = new URL(decodedText);
                const code = url.searchParams.get("code")

                if (url.pathname === "check" && code) {
                    checkCode(code);
                } else {
                    setCheckOk(false);
                    setDialogOpen(true);
                }
            },
            (errorMessage) => {
                console.warn(errorMessage);
            }).catch((error) => {
                console.warn(error);
            })
        }

        if (params && params.code) {
            checkCode(params.code)
        }

        createCamera();
    });

    return (
        <>
            <div ref={scanContainer} id="scanner" className={qrBoxLayout}></div>
            <Dialog
                open={dialogOpen} setOpen={setDialogOpen}
                icon={checkOk ? "approval" : "help"} 
                type={checkOk ? "notice" :"error"}
                title={checkOk ? "성공적으로 인증했어요" : "QR코드를 다시 확인하세요"}>
            <p className={defaultP({ align: "center" })}>
                {checkOk ? "스탬프를 찍어드렸어요." : "행사 인증용 QR코드가 아닌 것 같아요."}
            </p>
            {checkOk ? (
                <Link href="/home" className={button()}>홈으로 이동</Link>
            ):<p></p>}
            </Dialog>
        </>
    )
}