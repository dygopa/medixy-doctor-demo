import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { IGetSubjectsResponse } from "domain/core/response/subjectsResponse";

export interface ISubjectsListState {
    getSubjects: ISubjectsListSubjectsListState;
}

interface ISubjectsListSubjectsListState {
    data: IGetSubjectsResponse;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null; 
}

export const initialState: ISubjectsListState= {
    getSubjects: {
      data: {} as IGetSubjectsResponse,
      loading: false,
      successful: false,
      error: null,
    },
}