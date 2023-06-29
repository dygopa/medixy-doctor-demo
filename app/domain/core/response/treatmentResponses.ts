import { ITreatment } from "../entities/treatmentEntity";

export interface IGetTreatmentsResponse {
    data: ITreatment[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface ICreateTreatmentResponse {
    data: ITreatment;
    metadata: {}
}

export interface IGetTreatmentPDFResponse {
    data: ITreatment;
    metadata: {}
}
