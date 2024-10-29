"use client";
import { ManageSchedule } from "@/app/actions/manage_schedule";
import { button } from "@/app/styles/buttons.css";
import { scheduleTable, scheduleContentBlock, schedulePlace, simpleInput, inputLayout, inputWrapper, selectButton, selectLayout, scheduleLine } from "@/app/styles/layouts.css";
import { defaultP, icon } from "@/app/styles/others.css";
import { Schedule } from "@/app/types/common";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import DatePicker from "tui-date-picker";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import Dialog from "../Dialog";

export default function AdminEvents(props: { data: Schedule[] }) {
    const [data, setData] = useState<Schedule[]>(props.data);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [isOpenCreate, setOpenCreate] = useState<boolean>(false);
    const [, setStartDatePicker] = useState<DatePicker|null>(null);
    const [, setEndDatePicker] = useState<DatePicker|null>(null);

    const [state, ManageData] = useFormState(ManageSchedule, { type: "create", ok: true, refresh: false, contest: localStorage.getItem("contest") ?? "0" });

    const dateWrapperStart = useRef<HTMLDivElement>(null);
    const dateWrapperEnd = useRef<HTMLDivElement>(null);  
    const dateInputStart = useRef<HTMLInputElement>(null);
    const dateInputEnd = useRef<HTMLInputElement>(null);

    function controlCreateEvent() {
        if (isOpenCreate) {
            setStartDatePicker(null);
            setEndDatePicker(null);
            setOpenCreate(false);
        } else {
            setOpenCreate(true);
        }
    }

    useEffect(() => {
        if (dateWrapperStart.current && dateWrapperEnd.current
            && dateInputStart.current && dateInputEnd.current && isOpenCreate
        ) {
            setStartDatePicker(new DatePicker(dateWrapperStart.current, {
                date: new Date(),
                input: {
                    element: dateInputStart.current,
                    format: "yyyy-MM-dd hh:mm"
                },
                timePicker: {
                    layoutType: "tab",
                    inputType: "spinbox"
                }
            }));
    
            setEndDatePicker(new DatePicker(dateWrapperEnd.current, {
                date: new Date(),
                input: {
                    element: dateInputEnd.current,
                    format: "yyyy-MM-dd hh:mm"
                },
                timePicker: {
                    layoutType: "tab",
                    inputType: "spinbox",
                    format: "hh:mm"
                }
            }));
        }
    }, [isOpenCreate])

    useEffect(() => {
        async function refreshData() {
            if (state.refresh) {
                setData(await ManageSchedule({ type: "get", ok: true, refresh: false, contest: localStorage.getItem("contest") ?? "0" }));
            }    
        }

        refreshData();
    }, [state.refresh])

    return(
        <main>
            <menu className={simpleInput}>
                <button type="button" className={button()} onClick={() => controlCreateEvent()}>
                    추가하기
                </button>
                <button type="button" className={button()}
                    onClick={async () => setData(await ManageSchedule({ type: "get", ok: true, refresh: false, contest: localStorage.getItem("contest") ?? "0"}))}>
                    새로고침
                </button>
            </menu>
            {isOpenCreate ? <form action={ManageData} className={simpleInput}>
                <div>
                    <div>
                        <label className={selectButton}>
                            <select name="major" className={selectLayout} required>
                                <option>행사 소속</option>
                                <hr />
                                <option value="컴퓨터소프트웨어공학과">컴퓨터소프트웨어공학과</option>
                                <option value="정보보호학과">정보보호학과</option>
                                <option value="사물인터넷학과">사물인터넷학과</option>
                                <option value="AI빅데이터학과">AI빅데이터학과</option>
                                <option value="의료IT공학과">의료IT공학과</option>
                                <option value="메타버스&게임학과">메타버스&게임학과</option>
                                <option value="SW융합대학">SW융합대학</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label className={selectButton}>
                            <select name="eventType" className={selectLayout} required>
                                <option>행사 종류</option>
                                <hr />
                                <option value="EVENT_ONE">개회식</option>
                                <option value="EVENT_TWO">SW 프로젝트 경진대회</option>
                                <option value="EVENT_THREE">졸업생 토크 콘서트</option>
                                <option value="EVENT_FOUR">산업체 전문가 특강</option>
                                <option value="EVENT_FIVE">eSports 경진대회</option>
                                <option value="EVENT_SIX">폐회식</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div>
                    <div className={inputWrapper({ size: "limited" })}>
                        <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>tag</span>
                        <input className={inputLayout} type="text" name="eName" placeholder="행사 이름"/>
                    </div>
                    <div className={inputWrapper({ size: "limited" })}>
                        <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>person</span>
                        <input className={inputLayout} type="text" name="speaker" placeholder="연사자"/>
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="startTime">일정 시작</label>
                        <div className="tui-datepicker-input tui-datetime-input tui-has-focus">
                            <input type="text" ref={dateInputStart} name="startTime" aria-label="Date-Time" />
                            <span className="tui-ico-date"></span>
                            <div ref={dateWrapperStart} style={{marginTop: "-1px"}}></div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="endTime">일정 종료</label>
                        <div className="tui-datepicker-input tui-datetime-input tui-has-focus">
                            <input type="text" ref={dateInputEnd} name="endTime" aria-label="Date-Time" />
                            <span className="tui-ico-date"></span>
                            <div ref={dateWrapperEnd} style={{marginTop: "-1px"}}></div>
                        </div>
                    </div>
                </div>
                <div>
                    <label className={selectButton}>
                        <select name="building" className={selectLayout} required>
                            <option>행사 건물</option>
                            <hr />
                            <option value="인문과학관">인문과학관</option>
                            <option value="공학관">공학관</option>
                            <option value="멀티미디어관">멀티미디어관</option>
                            <option value="미디어랩스관">미디어랩스관</option>
                            <option value="의료과학관">의료과학관</option>
                        </select>
                    </label>
                    <div className={inputWrapper({ size: "limited" })}>
                        <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>tag</span>
                        <input className={inputLayout} type="text" name="room" placeholder="행사 호실"/>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" name="stamp" id="no_checking" value="NO_CHECKING" />
                        <label htmlFor="no_checking">스탬프 미부여</label>
                    </div>
                    <div>
                        <input type="radio" name="stamp" id="checking" value="CHECKING" />
                        <label htmlFor="checking">스탬프 부여</label>
                    </div>
                </div>
                <button>추가하기</button>
            </form> :""}
            <ul className={scheduleTable({ nomargin: true })}>
                {data.length > 0 ? data.map((event:Schedule) => (
                    <li key={event.secureId} className={scheduleLine}>
                        <div className={scheduleContentBlock}>
                            <p className={defaultP({ size: "lg", width: "time", align: "center", flexOptions: "notShrink" })}>
                            {event.startTime}
                            </p>
                            <p className={defaultP({ size: "lg" })}>
                                <span className={defaultP({ size: "sm", style: "disabled", width: "block" })}>
                                    {event.major} {event.categoryMessage}
                                </span>
                                {event.name}
                            </p>
                        </div>
                        <div className={scheduleContentBlock}>
                            <div className={`${icon({color: "notice"})} material-symbols-rounded`}>
                                {event.eventTypeMessage === "CHECKING" ? "approval" : ""}
                            </div>
                            <p className={`${schedulePlace} ${defaultP({ size: "lg", style: "disabled" })}`}>
                                <span className={defaultP({ size: "sm", style: "disabled" })}>{event.building}</span>
                                {event.location}
                            </p>
                        </div>
                    </li>
                )): <li>일정이 없어요.</li>}
            </ul>

            {!state.ok ? 
            <Dialog
                open={dialogOpen} setOpen={setDialogOpen}
                icon={"help"} 
                type={"error"}
                title={"입력한 정보를 다시 확인하세요"}>
                <p className={defaultP({ align: "center" })}>
                    입력된 정보가 잘못되었어요.
                </p>
            </Dialog>
            :""}
        </main>
    );
}