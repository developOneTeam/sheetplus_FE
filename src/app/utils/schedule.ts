import { Festival, Schedule } from "../types/common";

const now = new Date(Date.now());

export function filterScheduleByTime(array:Schedule[]) {
    return array.filter((event) => {
        if (event.startTime === "종일")
            return true;
        else if (event.startTime === "오전" && now.getHours() < 12)
            return true;
        else if (event.startTime === "오후" && now.getHours() < 18)
            return true;
        else if (event.startTime instanceof Date && event.startTime.getHours() >= now.getHours())
            return true;
        else
            return false;
    });
}

export function randomNextSchedule(stamp: string[], schedule: Schedule[]) {
    const array = filterScheduleByTime(schedule).filter((event) => !stamp.includes(event.secureId) && event.eventTypeMessage === "stamp");
    return array[Math.floor(Math.random() * array.length)];
}

export function displayedDate(festival: Festival) {
    const dateTime = new Intl.DateTimeFormat("ko-KR", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    if (festival.start_date > now) {
        return dateTime.format(festival.start_date);
    }
    else if (festival.end_date < now) {
        return dateTime.format(festival.end_date)
    }
    else if (festival.end_date > now ) {
        return dateTime.format(festival.start_date)
    } else {
        return dateTime.format(festival.end_date)
    }
}