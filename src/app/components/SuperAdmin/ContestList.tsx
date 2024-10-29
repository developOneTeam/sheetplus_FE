"use client";
import { ManageContest } from "@/app/actions/manage_contest";
import { button } from "@/app/styles/buttons.css";
import { inputWrapper, inputLayout, simpleInput } from "@/app/styles/layouts.css";
import { defaultP, icon } from "@/app/styles/others.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom";
import DatePicker from "tui-date-picker";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import Dialog from "../Dialog";

export default function ContestList() {
    const [contestList, setList] = useState<{ contestId: number, contestName: string }[]>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [, setStartDatePicker] = useState<DatePicker|null>(null);
    const [, setEndDatePicker] = useState<DatePicker|null>(null);

    const [isOpenCreate, setOpenCreate] = useState<boolean>(false);
    const [state, CreateAction] = useFormState(ManageContest, { type: "create", ok: true });

    const dateWrapperStart = useRef<HTMLDivElement>(null);
    const dateWrapperEnd = useRef<HTMLDivElement>(null);  
    const dateInputStart = useRef<HTMLInputElement>(null);
    const dateInputEnd = useRef<HTMLInputElement>(null);  

    async function getContestList() {
        const list = await ManageContest({ type: "get", ok: true})
        
        if (!list.error) {
            setList(list);
        }
    }

    function controlCreateContest() {
        if (isOpenCreate) {
            setStartDatePicker(null);
            setEndDatePicker(null);
            setOpenCreate(false);
        } else {
            setOpenCreate(true);
        }
    }

    useEffect(() => {
        getContestList();
    }, []);

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

    return (<>
        <menu className={simpleInput}>
            <button type="button" className={button()} onClick={() => controlCreateContest()}>행사 추가</button>
        </menu>

        {isOpenCreate ? <form action={CreateAction} className={simpleInput}>
            <div className={inputWrapper({ size: "limited" })}>
                <span className={`${icon({ color: "notice" })} material-symbols-rounded`}>tag</span>
                <input className={inputLayout} type="text" name="cName" placeholder="행사 이름"/>
            </div>
            <label htmlFor="startDate">행사 시작</label>
            <div className="tui-datepicker-input tui-datetime-input tui-has-focus">
                <input type="text" ref={dateInputStart} name="startDate" aria-label="Date-Time" />
                <span className="tui-ico-date"></span>
                <div ref={dateWrapperStart} style={{marginTop: "-1px"}}></div>
            </div>
            <label htmlFor="endDate">행사 종료</label>
            <div className="tui-datepicker-input tui-datetime-input tui-has-focus">
                <input type="text" ref={dateInputEnd} name="endDate" aria-label="Date-Time" />
                <span className="tui-ico-date"></span>
                <div ref={dateWrapperEnd} style={{marginTop: "-1px"}}></div>
            </div>
            <button>추가하기</button>
        </form>:""}
        <ul>
            {contestList.length > 0 ? contestList.map((data) => (
                <li key={data.contestId}>
                    <span>{data.contestName}</span>
                    <Link href={`/admin/${data.contestId}/dashboard`}>관리하러 가기</Link>
                </li>
            ))
            :<li>예정된 행사가 없습니다.</li>}
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
        
    </>)
}