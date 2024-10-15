"use client";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";
import { accentArea, main } from "../styles/layouts.css";
import { defaultP } from "../styles/others.css";
import { button } from "../styles/buttons.css";
import { useEffect, useState } from "react";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID ?? ""
}

export default function Page() {
    const [push, setPushObject] = useState<Messaging|undefined>(undefined);
    const [pushOn, setPush] = useState<boolean>(false);

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const push = getMessaging(app);
        setPushObject(push);

        if (pushOn) {
            onMessage(push, (payload) => {
                console.log("[Foreground] Message Received", payload)
            });    
        }
    }, [pushOn])

    async function supportsModuleWorker() {
        let supports = false;
        try {
            const test = await navigator.serviceWorker.register("/sw_import_tester.js", { type: "module" });
            supports = true;
            await test.unregister();
            
            console.log(supports);
            return supports;
        } catch {
            return supports;
        }
      }
      

    async function getServiceWorker() {
        if (await supportsModuleWorker()) {
            return await navigator.serviceWorker.register(`/push_sw.js?${new URLSearchParams(firebaseConfig).toString()}`, { type: "module" });
        } else {
            return await navigator.serviceWorker.register(`/push_sw_mozilla.js?${new URLSearchParams(firebaseConfig).toString()}`);
        }
    }

    function requestPushPerm() {
        Notification.requestPermission().then(async (permission) => {
            if (permission === "granted" && push) {
                await getToken(push, {
                    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_PUBLIC_KEY,
                    serviceWorkerRegistration: await getServiceWorker()
                }).then((currentToken) => {
                    if (currentToken) {
                        setPush(true);
                        console.log(`[Foreground] Push Token ${currentToken}`);
                    } else {
                        console.log("error");
                    }
                });
            }
        })
    }

    return (
        <main className={main({ center: true })}>
            <section className={accentArea()}>
                <p className={defaultP()}>
                    설정 값은 이 기기에서만 적용되어요.
                </p>
            </section>
            <button className={button({ types: pushOn ? "disabled" : undefined })} onClick={requestPushPerm}>알림 켜기</button>
        </main>
    )
};
