import { IService } from "./serviceEntity";
import { ISubject } from "./subjectEntity";

export interface IAppointment {
    id: string;
    status: number;
    observations: string;
    doctorId: number;
    subjectId: number;
    subject: ISubject;
    serviceId: number;
    service: IService;
    startHour: number;
    endHour: number;
    index: number;
    attentionWindowId: number;
    bookingDate: Date;
    bookingEndDate: Date;
    createdAt: Date;
}