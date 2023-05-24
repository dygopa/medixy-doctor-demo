import { DashboardFailure } from "domain/core/failures/dashboard/DashboardFailure";
import { PatientFailure } from "domain/core/failures/patient/patientFailure";
import { IGetPatientsResponse } from "domain/core/response/patientsResponse";
import { PatientRepository } from "infrastructure/repositories/patient/patientRepository";

export default class DashboardUseCase {
    private _repositoryPatients: PatientRepository = new PatientRepository();

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

    async getPatients(obj:{ skip?: number | string | undefined; sort?: any; limit?: number | undefined; searchQuery?: string | undefined; country?: string | undefined, startDate?: Date | undefined; endDate?: Date | undefined; }): Promise<IGetPatientsResponse> {
        try {
            const response = await this._repositoryPatients.getPatients(obj);

            if (response instanceof PatientFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}
