"use client";
import { InputWrapper, Input, Button } from "../styles/ui";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function LoginForm() {
    const [formDisabled, disableForm] = useState<"disabled"|undefined>("disabled");
    const [formMessage, setFormMessage] = useState<string>("");
    const submitButton = useRef<HTMLButtonElement>(null);

    function enableButton(e: ChangeEvent<HTMLInputElement>) {
        const isFullAddress = e.target.value.includes("@");

        if ((e.target.value.length === 0 || isFullAddress)
            && submitButton.current) {
            disableForm("disabled");
            submitButton.current.setAttribute("disabled", "");
        } else {
            disableForm(undefined);
        }

        if (isFullAddress) {
            setFormMessage("순천향대 메일 주소를 아이디만 입력해주세요.");
        }
    }

    useEffect(() => {
        if (!formDisabled && submitButton.current) {
            submitButton.current.removeAttribute("disabled");
        }
    }, [formDisabled]);
    
    return (
        <>
          <InputWrapper>
            <span className="material-symbols-rounded">mail</span>
            <Input type="text" name="email" placeholder="Email" onChange={enableButton} />
            <label htmlFor="email">@sch.ac.kr</label>
          </InputWrapper>
          <Button ref={submitButton} type="submit" types={formDisabled} onSubmit={() => {disableForm("disabled")}} disabled>메일 보내기</Button>
          <p>{formMessage}</p>
        </>
    );
}