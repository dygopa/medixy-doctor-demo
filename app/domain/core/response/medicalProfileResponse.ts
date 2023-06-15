import { IMedicalProfile } from "../entities/medicalProfileEntity";

export interface IGetMedicalProfilesResponse {
    data: IMedicalProfile[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
