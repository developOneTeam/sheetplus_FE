export type Schedule = {
    "secureId": string,
    "name": string,
    "startTime": string,
    "endTime": string,
    "location": string,
    "building": string,
    "speakerName": string,
    "major": string,
    "conditionMessage": string,
    "eventTypeMessage": string,
    "categoryMessage": string
}

export type Festival = {
    start_date: Date,
    end_date: Date,
    max_stamp: number,
    schedule: Schedule[]
}

export type Member = {
    id: number,
    name: string,
    studentId: string,
    major: string,
    email: string,
    memberType: "STUDENT"
}