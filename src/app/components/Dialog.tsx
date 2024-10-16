"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { iconButton } from "../styles/buttons.css";
import { dialogClose, dialogLayout, dialogOutline, iconDesc } from "../styles/layouts.css";
import { defaultH2, icon } from "../styles/others.css";
import { animate } from "framer-motion/dom";

export default function Dialog(props: { children: React.ReactNode, open: boolean, setOpen?: Dispatch<SetStateAction<boolean>>, icon: string, title: string, type: "error"|"notice"|undefined }) {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (props.open && dialog.current) {
            dialog.current.showModal();
            animate(dialog.current, { opacity: 1 }, { duration: 0.5 })
        }
    }, [props.open])

    return (
        <dialog ref={dialog} className={dialogOutline}>
            <div className={dialogLayout}>
                <form method="dialog" className={dialogClose} onSubmit={() => {
                        if (dialog.current)
                            animate(dialog.current, { opacity: 0 } , { duration: 0.5 });

                        if(props.setOpen)
                            props.setOpen(false);
                    }}>
                    <button className={`${iconButton()} material-symbols-rounded`} type="submit">close</button>
                </form>
                <div className={iconDesc}>
                    <span className={`${icon({ color: props.type })} material-symbols-rounded`}>{props.icon}</span>
                    <h2 className={defaultH2()}>{props.title}</h2>
                </div>
                {props.children}
            </div>
        </dialog>
    )
}