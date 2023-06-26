import { IUser } from "domain/core/entities/userEntity";
import { AppointmentFailure } from "domain/core/failures/appointment/appintmentFailure";
import { SubjectFailure } from "domain/core/failures/subject/subjectFailure";
import { UserFailure } from "domain/core/failures/user/userFailure";
import { IGetSubjectsResponse } from "domain/core/response/subjectsResponse";

export interface IDashboardState {
    totalDoctors: IGetTotalDoctorsState;
    totalSubjects: IGetTotalSubjectsState;
    totalAppointments: IGetTotalAppointmentsState;
    subjects: IGetSubjectsState;
    doctors: IGetDoctorsState;
}

interface IGetTotalDoctorsState {
    data: number;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null; 
}

interface IGetTotalSubjectsState {
    data: number;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null; 
}

interface IGetTotalAppointmentsState {
    data: number;
    loading: boolean;
    successful: boolean;
    error: AppointmentFailure | null; 
}

interface IGetSubjectsState {
    data: IGetSubjectsResponse;
    loading: boolean;
    successful: boolean;
    error: SubjectFailure | null; 
}

interface IGetDoctorsState {
    data: IUser[];
    loading: boolean;
    successful: boolean;
    error: UserFailure | null; 
}

export const initialState: IDashboardState = {
    totalDoctors: {
        data: 0,
        loading: false,
        successful: false,
        error: null,
    },
    totalSubjects: {
        data: 0,
        loading: false,
        successful: false,
        error: null,
    },
    totalAppointments: {
        data: 0,
        loading: false,
        successful: false,
        error: null,
    },
    subjects: {
      data: {} as IGetSubjectsResponse,
      loading: false,
      successful: false,
      error: null,
    },
    doctors: {
        data: [],
        loading: false,
        successful: false,
        error: null,
    },
}