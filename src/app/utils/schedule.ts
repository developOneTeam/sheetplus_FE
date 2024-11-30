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
        else {
            const date = new Date(event.startTime)
            
            if (date.getHours() >= now.getHours())
                return true;
            else
                return false;
        }
    });
}

export function randomNextSchedule(stamp: Schedule[], schedule: Schedule[]) {
    const array = filterScheduleByTime(schedule).filter((event) => stamp.some((stampedItem) => stampedItem.secureId === event.secureId));
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

export function displayedTime(dateSrc: string) {
    const convertedDate = new Date(dateSrc);
    const dateFormat = new Intl.DateTimeFormat("ko-KR", {
        hour: "numeric",
        minute: "numeric",
        hour12: false
    })

    return dateFormat.format(convertedDate);
}