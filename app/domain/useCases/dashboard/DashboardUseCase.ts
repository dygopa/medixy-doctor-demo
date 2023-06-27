import { AppointmentEnum } from "(presentation)/(enum)/appointment/appointmentEnum";
import { DashboardFailure } from "domain/core/failures/dashboard/DashboardFailure";
import { ScheduleFailure } from "domain/core/failures/schedule/scheduleFailure";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { IGetSubjectsResponse } from "domain/core/response/subjectsResponse";
import { ScheduleRepository } from "infrastructure/repositories/schedule/scheduleRepository";
import { SubjectRepository } from "infrastructure/repositories/subject/subjectRepository";
import moment from "moment";

export default class DashboardUseCase {
    private _repositorySubjects: SubjectRepository = new SubjectRepository();
    private _repositorySchedule: ScheduleRepository = new ScheduleRepository();

    async getPendingAppointments(id:number, date?:string): Promise<Array<any>> {
        try {
            
            const response = await this._repositorySchedule.getAppointments(id, date, AppointmentEnum.PENDING);

            if (response instanceof ScheduleFailure) throw response;
            console.log(response)

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getCompletedAppointments(id:number): Promise<Array<any>> {
        try {

            const list:any[] | ScheduleFailure = await this._repositorySchedule.getAppointments(id, undefined, AppointmentEnum.COMPLETE);

            if (list instanceof ScheduleFailure) throw list;

            console.log(list)
            
            return list;
        } catch (error) {
            throw error;
        }
    }

    async getLatestAppointment(id:number): Promise<any> {
        try {

            const list:any[] | ScheduleFailure = await this._repositorySchedule.getAppointments(id, undefined, AppointmentEnum.PENDING);

            if (list instanceof ScheduleFailure) throw list;

            let response = list.find((elem:any)=>{
                let date = moment(elem["fechaReserva"]).toDate()
                return moment(date).isSameOrAfter(moment().utc(true))
            })
            console.log(response)
            
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getSubjects(obj:{ skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetSubjectsResponse> {
        try {
            const response = await this._repositorySubjects.getSubjects(obj);

            if (response instanceof SubjectFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}
