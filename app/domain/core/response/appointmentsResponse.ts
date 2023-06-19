import { IAppointment } from "../entities/appointmentEntity";

export interface IGetAppointmentsResponse {
    data: IAppointment[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface IGetAppointmentResponse {
    data: IAppointment;
    metadata: {}
}

export interface IUpdateAppointmentResponse {
    data: boolean;
    metadata: {}
}
