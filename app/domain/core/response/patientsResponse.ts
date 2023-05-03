import { IPatient } from "../entities/patientEntity";

export interface IGetPatientsResponse {
    data: IPatient[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
