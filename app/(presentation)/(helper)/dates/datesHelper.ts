import { monthsEnum } from "(presentation)/(enum)/dates/datesEnum";
import moment from "moment";

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


export function getSubjectAge(birthDate: Date): number {
    let years = moment().utc().diff(moment(birthDate, "YYYY-MM-DD"), "years");
    let months = moment().utc().diff(moment(birthDate, "YYYY-MM-DD"), "months");
    let days = moment().utc().diff(moment(birthDate, "YYYY-MM-DD"), "days");
  
  
  
    if(years > 0){
     return years
    }
    if(months > 0){
      return months
    }
    if(days > 0){
      return days
    }
  
    return 0
  }
  
  export function getSubjectAgeType(birthDate: Date): string {
    let years = moment().utc().diff(moment(birthDate, "YYYY-MM-DD"), "years");
    let months = moment().utc().diff(moment(birthDate, "YYYY-MM-DD"), "months");
    let days = moment().utc().diff(moment(birthDate, "YYYY-MM-DD"), "days");
  
    if(years > 0){
      return "years"
     }
     if(months > 0){
       return "months"
     }
     if(days > 0){
       return "days"
     }
  
    return "years"
  }