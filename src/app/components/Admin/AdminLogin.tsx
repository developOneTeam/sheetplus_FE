"use client";
import { iconDesc, selectButton, selectLayout, accentArea } from "../../styles/layouts.css";
import { icon, defaultH2, defaultP } from "../../styles/others.css";
import LoginForm from "../LoginForm";
import { useState } from "react";

export default function AdminLogin(props: { 
    list: 
        { contestId: number, contestName: string }[] | null
}) {
    const [contest, setContest] = useState<string>("");
    const [memberType, setMemberType] = useState<"super"|"admin">("super");

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
            <label className={selectButton}>
                <select className={selectLayout} onChange={(e) => {
                    if (e.target.value === "super" || e.target.value === "admin")
                        setMemberType(e.target.value);
                    localStorage.setItem("member_type", e.target.value);
                }} required defaultValue={"admin"}>
                    <option value="">회원 유형을 선택해주세요</option>
                    <hr></hr>
                    <option value={"super"}>최고 관리자</option>
                    <option value={"admin"}>일반 관리자</option>
                </select>
            </label>
        </div>
        <LoginForm admin={memberType} contest={contest !== "" ? contest : undefined} />
        <div className={accentArea({ center: true })}>
            <p className={defaultP({ size: "sm" })}>입력하신 이메일 주소로 <br /> 로그인 혹은 가입할 수 있는 링크를 보내드려요.</p>
        </div>
        </>
    )
}