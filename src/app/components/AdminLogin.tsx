"use client";
import { iconDesc, selectButton, selectLayout, accentArea } from "../styles/layouts.css";
import { icon, defaultH2, defaultP } from "../styles/others.css";
import LoginForm from "./LoginForm";
import { useState } from "react";

export default function AdminLogin(props: { 
    list: 
        { contestId: number, contestName: string }[] | null
}) {
    const [contest, setContest] = useState<string>("");

    console.log(props.list);

    return (
        <>
        <div className={iconDesc}>
            <span className={`${icon({ color: "primary" })} material-symbols-rounded`}>
                date_range
            </span>
            <h2 className={defaultH2({ style: "primary" })}>관리자 로그인</h2>
            <label className={selectButton}>
                <select className={selectLayout} onChange={(e) => {
                    setContest(e.target.value);
                    localStorage.setItem("contest", e.target.value);
                }} required defaultValue={1}>
                    <option value="">행사를 선택해주세요</option>
                    <hr></hr>
                    {props.list ? props.list.map((item) => (
                        <option key={item.contestId} value={item.contestId}>{item.contestName}</option>
                    )) : ""}
                    <option value={"all"}>운영 관리</option>
                </select>
            </label>
        </div>
        <LoginForm admin={contest === "all" ? "super" : "normal"} contest={contest !== "" ? contest : undefined} />
        <div className={accentArea({ center: true })}>
            <p className={defaultP({ size: "sm" })}>입력하신 이메일 주소로 <br /> 로그인 혹은 가입할 수 있는 링크를 보내드려요.</p>
        </div>
        </>
    )
}