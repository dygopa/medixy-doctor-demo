import { ISubject } from "../entities/subjectEntity";

export interface IGetSubjectsResponse {
    data: ISubject[];
    metadata: {
        total: number;
        limit: number | null;
    }
}
