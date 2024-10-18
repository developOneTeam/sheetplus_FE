export type Schedule = {
    secureId: string,
    name: string,
    major: string,
    categoryMessage: string,
    building: string,
    location: string|number,
    eventTypeMessage: string,
    startTime: Date|string
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