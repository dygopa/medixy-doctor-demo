import { DashboardFailure } from "domain/core/failures/dashboard/DashboardFailure";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { IGetSubjectsResponse } from "domain/core/response/subjectsResponse";
import { SubjectRepository } from "infrastructure/repositories/subject/subjectRepository";

export default class DashboardUseCase {
    private _repositorySubjects: SubjectRepository = new SubjectRepository();

    async getPendingAppointments(): Promise<Array<any>> {
        try {
            const response:any[] = [];

            if (response instanceof DashboardFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getCompletedAppointments(): Promise<Array<any>> {
        try {
            const response:any[] = [];

            if (response instanceof DashboardFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getLatestAppointment(): Promise<any> {
        try {
            const response:any = {};

            if (response instanceof DashboardFailure) throw response;

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
