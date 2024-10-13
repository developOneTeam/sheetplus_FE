"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { formLayout, inputLayout, inputWrapper } from "../styles/layouts.css";
import { button } from "../styles/buttons.css";
import { defaultP, icon } from "../styles/others.css";
import { Login } from "../actions/login";

export default function LoginForm() {
    const [formDisabled, disableForm] = useState<boolean>(true);
    const [formMessage, setFormMessage] = useState<string>("");
    const submitButton = useRef<HTMLButtonElement>(null);

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
    
    return (
        <form className={formLayout} action={Login} onSubmit={() => {disableForm(true); return true;}}>
            <div className={inputWrapper({ active: !formDisabled })}>
                <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>mail</span>
                <input className={inputLayout} type="text" name="email" placeholder="Email" onChange={enableButton} autoFocus required />
                <label htmlFor="email">@sch.ac.kr</label>
            </div>
            <button className={button({types: formDisabled ? "disabled": undefined})} ref={submitButton} type="submit" disabled>
                메일 보내기
            </button>
            <p className={defaultP({error: formMessage.length > 0 ? true : undefined})}>{formMessage}</p>
        </form>
    );
}