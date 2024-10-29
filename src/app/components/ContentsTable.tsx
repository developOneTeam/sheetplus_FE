"use client"
import Link from "next/link";
import { scheduleTable(), scheduleLine, scheduleContentBlock, schedulePlace, accentArea, iconDesc } from "../styles/layouts.css";
import { defaultH2, defaultP, icon } from "../styles/others.css";
import { Festival, Schedule } from "../types/common";
import { filterScheduleByTime } from "../utils/schedule";
import { buildingRadio, buildingSwitch } from "../styles/buttons.css";
import { useEffect, useRef, useState } from "react";

// undefined data would be "work[]"

type Props = {
    type: "schedule"|"work",
    mode?: "full",
    festival?: Festival,
    stamp? : string[],
    data: Schedule[]|undefined,
}

export default function ContentsTable(props: Props) {
    const [currentBdg, setBdg] = useState<string>("sixBdg");
    const [data, setData] = useState<Schedule[]|undefined>(props.data);
    const firstPriorityBdg = useRef<HTMLInputElement>(null);
    const secondPriorityBdg = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        if (props.data) {
            if (!props.mode) {
                setData(
                    filterScheduleByTime(props.data).filter((event) => event.building === currentBdg)
                );
                
            } else {
                setData(props.data.filter((event) => event.building === currentBdg))
            }
        }
    }, [currentBdg, props.data, props.mode]);

    useEffect(() => {
        if (secondPriorityBdg.current && !props.mode) 
            secondPriorityBdg.current.click();
        else if (firstPriorityBdg.current && props.mode)
            firstPriorityBdg.current.click();
    }, [props.mode]);

    return (
        <>
            <fieldset className={accentArea({ direction: "row", overflow: "scroll" })}>
                {props.mode ? (
                    <>
                    <input type="radio" name="bdg" ref={firstPriorityBdg}
                        onChange={() => (setBdg(""))} className={buildingRadio} checked id="allBdg" />
                    <label className={buildingSwitch} htmlFor="allBdg">
                        전체
                    </label>
                    </>
                ):""}
                <input type="radio" name="bdg" ref={secondPriorityBdg}
                    onChange={() => (setBdg("인문과학관"))} className={buildingRadio} id="sixBdg"/>
                <label className={buildingSwitch} htmlFor="sixBdg">
                    인문과학관
                </label>
                <input type="radio" name="bdg" onChange={() => (setBdg("공학관"))} className={buildingRadio} id="nineBdg"/>
                <label className={buildingSwitch} htmlFor="nineBdg">
                    공학관
                </label>
                <input type="radio" name="bdg" onChange={() => (setBdg("멀티미디어관"))} className={buildingRadio} id="mBdg"/>
                <label className={buildingSwitch} htmlFor="mBdg">
                    멀티미디어관
                </label>
                <input type="radio" name="bdg" onChange={() => (setBdg("미디어랩스관"))} className={buildingRadio} id="mlBdg"/>
                <label className={buildingSwitch} htmlFor="mlBdg">
                    미디어랩스관
                </label>
                <input type="radio" name="bdg" onChange={() => (setBdg("의료과학관"))} className={buildingRadio} id="oneBdg"/>
                <label className={buildingSwitch} htmlFor="oneBdg">
                    의료과학관
                </label>
            </fieldset>
            <ul className={scheduleTable()}>
            {props.type === "schedule" && data ? (
                <>
                {data.length > 0 ? data.map((event) => (
                    <li key={event.secureId}><Link href={`/schedule/${event.secureId}`} className={scheduleLine}>
                        <div className={scheduleContentBlock}>
                            <p className={defaultP({ size: "lg", width: "time", align: "center", flexOptions: "notShrink" })}>
                            {event.startTime instanceof Date ? <>{new Intl.DateTimeFormat("ko-KR", {
                                timeStyle: "short",
                                hourCycle: "h23"
                            }).format(event.startTime)}</> : event.startTime}
                            </p>
                            <p className={defaultP({ size: "lg" })}>
                                <span className={defaultP({ size: "sm", style: "disabled", width: "block" })}>
                                    {event.major} {event.categoryMessage}
                                </span>
                                {event.name}
                            </p>
                        </div>
                        <div className={scheduleContentBlock}>
                            <div className={`${icon({color: "notice"})} material-symbols-rounded`}>{event.eventTypeMessage === "stamp" ? (
                                (props.stamp ? props.stamp.includes(event.secureId):false) 
                                ? "check_circle" :"approval") : ""}</div>
                            <p className={`${schedulePlace} ${defaultP({ size: "lg", style: "disabled" })}`}>
                                <span className={defaultP({ size: "sm", style: "disabled" })}>{event.building}</span>
                                {event.location}
                            </p>
                        </div>
                    </Link></li>
                )): (
                    <div className={iconDesc}>
                        <span className={`${icon({ color: "disabled" })} material-symbols-rounded`}>
                        event_available
                        </span>
                        <h2 className={defaultH2({ style: "disabled" })}>오늘 남은 일정이 없어요</h2>
                        <p className={defaultP({ style: "disabled" })}>일정 탭에서 전체 일정을 확인할 수 있어요</p>
                    </div>
                )}
                </>
            ):""}
            </ul>
        </>
    )
}