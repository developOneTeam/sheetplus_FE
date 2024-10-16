"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { formLayout, inputLayout, inputWrapper } from "../styles/layouts.css";
import { button } from "../styles/buttons.css";
import { defaultP, icon } from "../styles/others.css";
import { Login } from "../actions/login";
import { useFormState } from "react-dom";
import Link from "next/link";
import Dialog from "./Dialog";

export default function LoginForm() {
    const [formDisabled, disableForm] = useState<boolean>(true);
    const [formMessage, setFormMessage] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const submitButton = useRef<HTMLButtonElement>(null);

    const [state, submitAction] = useFormState(Login, { ok: true, try: 0});

    function enableButton(e: ChangeEvent<HTMLInputElement>) {
        const isFullAddress = e.target.value.includes("@");

        if ((e.target.value.length === 0 || isFullAddress)
            && submitButton.current) {
            disableForm(true);
            submitButton.current.setAttribute("disabled", "");
        } else {
            disableForm(false);
        }

        if (isFullAddress) {
            setFormMessage("순천향대 메일 주소를 아이디만 입력해주세요.");
        } else {
            setFormMessage("");
        }
    }

    useEffect(() => {
        if (submitButton.current) {
            if (!formDisabled) {
                submitButton.current.removeAttribute("disabled");
            } else {
                submitButton.current?.setAttribute("disabled", "");
            }    
        }
    }, [formDisabled]);

    useEffect(() => {
        if (state.try) {
            setDialogOpen(true);
        }
    }, [state]);
    
    return (
        <>
        <form className={formLayout} action={submitAction} onSubmit={() => {disableForm(true); return true;}}>
            <div className={inputWrapper({ active: !formDisabled })}>
                <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>mail</span>
                <input className={inputLayout} type="text" id="email" name="email" placeholder="순천향대 메일 아이디" onChange={enableButton} autoFocus required />
                <label htmlFor="email">@sch.ac.kr</label>
            </div>
            <button className={button({types: formDisabled ? "disabled": undefined})} ref={submitButton} type="submit" disabled>
                메일 보내기
            </button>
            <p className={defaultP({style: formMessage.length > 0 ? "error" : undefined})}>{formMessage}</p>
        </form>
        {state.try ? (
            <Dialog
                open={dialogOpen} setOpen={setDialogOpen}
                icon={state.ok ? "mark_email_read" : "help"} 
                type={state.ok ? "notice" : "error"}
                title={state.ok ? "이메일 발송 완료!": "이메일 주소를 다시 확인하세요"}>
            <p className={defaultP({ align: "center" })}>
                {state.ok ?
                    "메일함에서 확인해주세요.":"이메일을 발송하지 못했어요."
                }
            </p>
            {state.ok ? (
                <>
                    <Link href="https://mail.sch.ac.kr" className={button()} target="_blank">순천향대 메일 열기</Link>
                    <Link href="https://portal.sch.ac.kr" className={button({ types: "secondary" })} target="_blank">순천향대 포털에서 확인하기</Link>
                </>
            ):(
                <>
                    <Link href="https://portal.sch.ac.kr" className={button()} target="_blank">순천향대 포털에서 확인하기</Link>
                    <Link href="tel:041-530-1411" className={button({ types: "secondary" })}>전산팀에 전화하기</Link>
                </>
            )}
            </Dialog>
        ):""}
        </>
    );
}