import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";

export interface ICreateSubjectState {
    createSubject: ISubjectCreateSubjectState;
}

interface ISubjectCreateSubjectState {
    data: boolean;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null;
}

export const initialState: ICreateSubjectState = {
    createSubject: {
        data: false,
        loading: false,
        successful: false,
        error: null,
    }
}