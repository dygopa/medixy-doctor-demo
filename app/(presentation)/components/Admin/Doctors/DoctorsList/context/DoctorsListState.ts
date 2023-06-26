import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { IGetSubjectsResponse } from "domain/core/response/subjectsResponse";
import { IGetUsersResponse } from "domain/core/response/usersResponse";

export interface IDoctorsListState {
    getDoctors: IDoctorsListDoctorsListState;
}

interface IDoctorsListDoctorsListState {
    data: IGetUsersResponse;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null; 
}

export const initialState: IDoctorsListState= {
    getDoctors: {
      data: {} as IGetUsersResponse,
      loading: false,
      successful: false,
      error: null,
    },
}