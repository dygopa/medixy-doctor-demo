import { IUser } from "domain/core/entities/userEntity";
import { UserFailure } from "domain/core/failures/user/userFailure";

export interface IDoctorViewState {
    getDoctorById: IGetDoctorState;
    getUserMedicalSpecialities: IUserUserState;
}

interface IGetDoctorState {
    data: IUser | null;
    loading: boolean;
    successful: boolean;
    error: UserFailure| null; 
}

interface IUserUserState {
    data: string | null | Object | Array<any>;
    loading: boolean;
    successful: boolean;
    error: UserFailure | null; 
}

export const initialState: IDoctorViewState = {
    getDoctorById: {
        data: null,
        loading: false,
        successful: false,
        error: null,
    },
    getUserMedicalSpecialities: {
        data: [],
        loading: false,
        successful: false,
        error: null,
    },

}