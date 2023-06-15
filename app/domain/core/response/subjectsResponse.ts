import { IRelationSubject, ISubject } from "../entities/subjectEntity";

export interface IGetSubjectsResponse {
    data: ISubject[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface ICreateSubjectResponse {
    data: ISubject;
    metadata: {}
}

export interface IGetSubjectRelationsResponse {
    data: IRelationSubject[];
    metadata: {}
}