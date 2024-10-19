export const user = {
    studentMajor: "의료IT공학과",
    studentName: "홍길동",
    event: {
        stamps: 3,
        stamp: ["ccca", "baca", "xdss"]
    }
}

export const festival = {
    start_date: new Date("2024-11-05"),
    end_date: new Date("2024-11-06"),
    max_stamp: 5,
    schedule: [{
        secureId: "ccca",
        name: "개회식",
        major: "SW융합대학",
        categoryMessage: "",
        building: "인문과학관",
        location: "대강당",
        eventTypeMessage: "stamp",
        startTime: new Date("2024-11-05 10:00")
    }, {
        secureId: "baca",
        name: "코딩테스트, 무엇이 중요한가?",
        major: "컴퓨터소프트웨어공학과",
        categoryMessage: "졸업생 토크콘서트",
        building: "멀티미디어관",
        location: "M502",
        eventTypeMessage: "stamp",
        startTime: new Date("2024-11-05 12:00")
    }, {
        secureId: "aacd",
        name: "전시 및 관람",
        major: "컴퓨터소프트웨어공학과",
        categoryMessage: "SW프로젝트 경진대회",
        building: "멀티미디어관",
        location: "5층",
        eventTypeMessage: "normal",
        startTime: "종일" 
    }, {
        secureId: "xdss",
        name: "eSports 경진대회",
        major: "SW융합대학",
        categoryMessage: "",
        building: "인문과학관",
        location: "6125",
        eventTypeMessage: "stamp",
        startTime: "오후" 
    }, {
        secureId: "bbbe",
        name: "IoT 시대의 보안을 논하다",
        major: "사물인터넷학과",
        categoryMessage: "졸업생 토크콘서트",
        building: "미디어랩스관",
        location: "ML313",
        eventTypeMessage: "stamp",
        startTime: new Date("2024-11-05 14:00")
    }]
}