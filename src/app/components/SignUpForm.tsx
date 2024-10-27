"use client";
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";
import { formLayout, inputLayout, inputWrapper, selectButton, selectLayout } from "../styles/layouts.css";
import { button } from "../styles/buttons.css";
import { defaultP, icon } from "../styles/others.css";
import { useFormState } from "react-dom";
import Link from "next/link";
import Dialog from "./Dialog";
import { Signup } from "../actions/signup";

export default function SignUpForm(props : 
    { 
        mail: string|undefined,
        code: string|undefined
    }) {
    const authEmail = props.mail;
    const authCode = props.code;

    const memberType = localStorage.getItem("member_type");
    const contest = localStorage.getItem("contest");

    const [formDisabled, disableForm] = useState<boolean>(true);
    const [formMessage, setFormMessage] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const submitButton = useRef<HTMLButtonElement>(null);

    const [state, submitAction] = useFormState(Signup, { ok: true, try: 0, notSelected: false });

    function enableButton(e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
        if ((e.target.value.length === 0 ||
            (e.target.name === "studentId" && e.target.value.length !== 8)
        ) && submitButton.current) {
            disableForm(true);
            submitButton.current.setAttribute("disabled", "");
        } else {
            disableForm(false);
        }
    }

    function studentIdValidation(e: FocusEvent<HTMLInputElement>) {
        if (e.target.value.length !== 8) {
            setFormMessage("8자리 학번으로 입력해주세요.");
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
            <input type="hidden" name="code" value={authCode ?? ""} readOnly />
            <div className={inputWrapper({ active: !formDisabled })}>
                <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>mail</span>
                <input className={inputLayout} type="text" name="email" placeholder="순천향대 메일 아이디"
                    value={authEmail ?? ""} onChange={enableButton} readOnly />
            </div>
            <div className={inputWrapper({ active: !formDisabled })}>
                <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>beenhere</span>
                <input className={inputLayout} type="text" inputMode="numeric" name="studentId" 
                    placeholder={memberType === "student" ? "학번을 입력해주세요 (8자리)" : "사번(교번)을 입력해주세요 (8자리)"}
                    onChange={enableButton} onBlur={studentIdValidation} required />
            </div>
            <div className={inputWrapper({ active: !formDisabled })}>
                <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>signature</span>
                <input className={inputLayout} type="text" name="name" placeholder="성함을 입력해주세요" onChange={enableButton} required />
            </div>
            <div className={inputWrapper({ active: !formDisabled, align: "between" })}>
                <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>manufacturing</span>
                <label className={selectButton}>
                    <select id="major" className={selectLayout} onChange={enableButton} required>
                        <option>학과{memberType === "student" ? "" : "/부서"}를 선택해주세요</option>
                        <hr />
                        <option value="컴퓨터소프트웨어공학과">컴퓨터소프트웨어공학과</option>
                        <option value="정보보호학과">정보보호학과</option>
                        <option value="사물인터넷학과">사물인터넷학과</option>
                        <option value="AI빅데이터학과">AI빅데이터학과</option>
                        <option value="의료IT공학과">의료IT공학과</option>
                        <option value="메타버스&게임학과">메타버스&게임학과</option>
                        {memberType !== "student" ? <>
                            <option value="SW중심대학 사업운영팀">SW중심대학 사업운영팀</option>
                            <option value="SW융합대학">SW융합대학</option>
                        </> : ""}
                    </select>
                </label>
            </div>
            <button className={button({types: formDisabled ? "disabled": undefined})} ref={submitButton} type="submit" disabled>
                가입 완료하기
            </button>
            <p className={defaultP({style: formMessage.length > 0 ? "error" : undefined})}>{formMessage}</p>
        </form>
        {state.try ? (
            <Dialog
                open={dialogOpen} setOpen={setDialogOpen}
                icon={state.ok ? "mark_email_read" : "help"} 
                type={state.ok ? "notice" : "error"}
                title={state.ok ? "가입 완료!": "등록에 실패했어요"}>
            <p className={defaultP({ align: "center" })}>
                {state.ok ?
                    "이제 참여할 수 있어요":"입력한 정보를 확인하시거나 잠시 후 다시 시도해주세요"
                }
            </p>
            {state.ok ? (
                <Link href={memberType === "student" ? "/home" : `/admin/${contest}/dashboard`} 
                    className={button()}>
                    시작하기
                </Link>
            ):<p></p>}
            </Dialog>
        ):""}
        </>
    );
}