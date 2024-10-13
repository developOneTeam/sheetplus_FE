"use client";
import { useState } from "react";
import { faqLink } from "../styles/others.css";
import Dialog from "./Dialog";

export default function DialogLink(props: { children: React.ReactNode, message: string, icon: string, type: "error"|"notice"|undefined }) {
    const [isOpen, open] = useState<boolean>(false);

    function openDialog() {
        open(true);
    }

    return (
        <>
            <button className={faqLink()} type="button" onClick={() => openDialog()}>{props.message}</button>
            <Dialog open={isOpen} setOpen={open} icon={props.icon} title={props.message} type={props.type} >
                {props.children}
            </Dialog>
        </>
    )
}