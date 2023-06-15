import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { IGetSubjectsResponse } from "domain/core/response/subjectsResponse";

export interface ICompanionsListState {
    getCompanions: ICompanionsListCompanionsListState;
    createCompanion: ICompanionCreateCompanionState;
}

interface ICompanionsListCompanionsListState {
    data: IGetSubjectsResponse;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null; 
}

interface ICompanionCreateCompanionState {
    data: boolean;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null;
}

export const initialState: ICompanionsListState= {
    getCompanions: {
      data: {} as IGetSubjectsResponse,
      loading: false,
      successful: false,
      error: null,
    },
    createCompanion: {
        data: false,
        loading: false,
        successful: false,
        error: null,
    },
}