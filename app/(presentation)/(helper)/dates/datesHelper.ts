import { monthsEnum } from "(presentation)/(enum)/dates/datesEnum";

export const getFullDate = (date: Date) => {
    return `${date.getDate()} de ${monthsEnum[date.getMonth()].toLowerCase()} del ${date.getFullYear()}`;
}

export const get12HoursFormat = (date: Date): string => {
    let hours: number = date.getHours();
    let minutes: number | string = date.getMinutes();
    const ampm: string = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;

    return strTime;
}