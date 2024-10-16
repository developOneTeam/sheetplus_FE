"use client";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";
import { accentArea, main, scheduleContentBlock, scheduleLine } from "../../styles/layouts.css";
import { defaultP, icon } from "../../styles/others.css";
import { toggleSwitch } from "../../styles/buttons.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID ?? ""
}

export default function Page() {
    const [push, setPushObject] = useState<Messaging|undefined>(undefined);
    const [inProgress, setWorkingState] = useState<boolean>(false);
    const notiToggle = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        setPushObject(getMessaging(app));

        if (localStorage.getItem("fcm") && notiToggle.current 
            && !notiToggle.current.checked) {
            notiToggle.current.click();
        }

        if (push) {
            onMessage(push, (payload) => {
                console.log("[Foreground] Message Received", payload)
            });    
        }
    }, [push]);      

    async function getServiceWorker() {
        // try {
        //     const currentWorker = await navigator.serviceWorker.getRegistration("push_sw");
        //     if(currentWorker)
        //         return currentWorker;
        // } catch {
            try {
                console.log("trying");
                const newType = await navigator.serviceWorker.register(`/push_sw.js?${new URLSearchParams(firebaseConfig).toString()}`, { type: "module" });
                console.log(newType);
                return newType;
            } catch {
                const oldType = await navigator.serviceWorker.register(`/push_sw_mozilla.js?${new URLSearchParams(firebaseConfig).toString()}`);
                console.log(oldType);
                return oldType;
            }    
        // }
    }

    async function requestPushPerm(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.checked) {
            const activeWorker = await navigator.serviceWorker.getRegistration("push_sw");

            if (activeWorker) {
                activeWorker.unregister();
                localStorage.removeItem("fcm");
            }
        } else {
            e.target.checked = false;
            setWorkingState(true);

            Notification.requestPermission().then(async (permission) => {
                if (permission === "granted" && push) {
                    await getToken(push, {
                        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_PUBLIC_KEY,
                        serviceWorkerRegistration: await getServiceWorker()
                    }).then((currentToken) => {
                        if (currentToken) {
                            localStorage.setItem("fcm", currentToken);
                            e.target.checked = true;
                            setWorkingState(false);
                        } else {
                            console.log("error");
                        }
                    });
                }
            })
        };
    }

    return (
        <main className={main({ center: false })}>
            <section className={accentArea()}>
                <p className={defaultP()}>
                    설정 값은 이 기기에서만 적용되어요.
                </p>
            </section>
            <div className={scheduleLine}>
                <label htmlFor="noti" className={defaultP({ size: "l" })}>푸시 알림 켜기</label>
                <div className={scheduleContentBlock}>
                    {inProgress ? (
                        <motion.div className={`${icon({ color: "notice"})} material-symbols-rounded`}
                            animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 0.5 }}>
                            progress_activity
                        </motion.div>
                    ):""}
                    <input ref={notiToggle} type="checkbox" id="noti" className={toggleSwitch} onChange={requestPushPerm}/>
                </div>
            </div>
        </main>
    )
};
