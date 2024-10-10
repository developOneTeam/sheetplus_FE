"use client";
import { InputWrapper, Input, Button } from "../styles/ui";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function LoginForm() {
    const [formDisabled, disableForm] = useState<"disabled"|undefined>("disabled");
    const submitButton = useRef<HTMLButtonElement>(null);

    function enableButton(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length === 0 && submitButton.current) {
            disableForm("disabled");
            submitButton.current.setAttribute("disabled", "");
        } else {
            disableForm(undefined);
        }
    }

    useEffect(() => {
        if (formDisabled && submitButton.current) {
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
          <Button ref={submitButton} type="submit" types={formDisabled} disabled>메일 보내기</Button>
        </>
    );
}