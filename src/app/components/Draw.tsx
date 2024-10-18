"use client";
import { useState, ChangeEvent } from "react";
import { button } from "../styles/buttons.css";
import { checkBoxSet, pickArea, pickButtonSet, pickOptionSet, scheduleContentBlock, scheduleLine, scheduleTable } from "../styles/layouts.css";
import { defaultP, defaultH2, checkbox } from "../styles/others.css";
import { Member } from "../types/common"
import { motion } from "framer-motion";

type Props = {
    members: Member[]
}

export default function Draw( props: Props ) {
    const [allowDuplicate, setDuplicate] = useState<boolean>(false);
    const [pickedPersonGotPresent, setGotPresent] = useState<boolean>(false);
    const [pickedPerson, pickPerson] = useState<string|Member>("???");
    const [pickWait, setTime] = useState<number>(3);

    const [pickedHistory, setHistory] = useState<Member[]>([]);

    function checkDuplicate(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            setDuplicate(true);
        } else {
            setDuplicate(false);
        }
    }

    function checkGotPresent(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            setGotPresent(true);
        } else {
            setGotPresent(false);
        }
    }

    function setPickTiming(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value && !isNaN(parseFloat(e.target.value))) {
            setTime(Math.trunc(parseFloat(e.target.value) * 1000));
        }
    }

    async function randomPerson() {
        pickPerson("추첨 중");
        
        let pickedPerson: Member|null = null
        if (allowDuplicate && props.members) {
            pickedPerson = props.members[Math.floor(Math.random() * props.members.length)];
        } else if(props.members) {
            const filteredMembers = props.members.filter((member) => !pickedHistory.includes(member));
            pickedPerson = filteredMembers[Math.floor(Math.random() * filteredMembers.length)];
            console.log(pickedPerson);
        } else {
            pickPerson("");
        }

        console.log(pickedPerson);
        console.log(props.members);

        if (pickedPerson) {
            setTimeout(() => {
                    pickPerson(pickedPerson);
                    const currentHistory = pickedHistory;
                    currentHistory.push(pickedPerson);
                    setHistory(currentHistory);    
                
            }, pickWait);
        }
    }

    return (
        <>
        <section className={pickArea}>
            <motion.p
                className={defaultP({ size: "max", style: "primary", weight: "bold", width: "pick" })}

            >
                {typeof pickedPerson !== "string" ? (
                    <>
                    <span className={defaultP({width: "block", size: "lg"})}>{pickedPerson.major} {pickedPerson.studentId}</span>
                    {pickedPerson.name}
                    </>
                ) : pickedPerson !== "" ? pickedPerson : "추첨 실패"}
            </motion.p>
        </section>
        <section>
            <h2 className={defaultH2({ style: "disabled" })}>추첨 옵션</h2>
            <div className={pickOptionSet}>
                <div className={checkBoxSet}>
                    <input type="checkbox" id="pickDuplicate" className={checkbox} onChange={checkDuplicate} />
                    <label htmlFor="pickDuplicate" className={defaultP({style: "disabled"})}>중복 추첨</label>
                </div>
                <div className={checkBoxSet}>
                    <input type="checkbox" id="gotRewardBeforeNextPick" className={checkbox} onChange={checkGotPresent}/>
                    <label htmlFor="gotRewardBeforeNextPick" className={defaultP({style: "disabled"})}>다음 사람 추첨 시 경품 수령 처리</label>
                </div>
                <div>
                    <label htmlFor="pickWaitTime" className={defaultP({style: "disabled"})}>추첨 소요 시간</label>
                    <input type="number" id="pickWaitTime" onChange={setPickTiming} defaultValue={3} size={2} />
                    초
                </div>
            </div>
        </section>
        <section>
            <h2 className={defaultH2({ style: "disabled" })}>추첨 이력</h2>
            <ul className={scheduleTable}>
            {pickedHistory.map((drawHistory) => (
                <li key={drawHistory.id} className={scheduleLine}>
                    <p className={scheduleContentBlock}>
                        <span className={defaultP({ style: "disabled", size: "sm" })}>등위</span>
                        <span className={defaultP({ style: "disabled" })}>{drawHistory.major}</span>
                        <span className={defaultP({ style: "disabled" })}>{drawHistory.studentId}</span>
                        <span className={defaultP({ style: "disabled" })}>{drawHistory.name}</span>
                    </p>
                </li>
            ))}
            </ul>
        </section>
        <section className={pickButtonSet}>
            <button type="button" className={button({types: "secondary"})}>클릭 실수로 재추첨</button>
            <button type="button" className={button()} onClick={randomPerson}>{pickedPersonGotPresent ? "경품 수령 처리 후" :""} 추첨</button>
            {allowDuplicate ? "":<button type="button" className={button({types: "secondary"})}>자리 비움으로 재추첨</button>}
        </section>
        </>
    )
}