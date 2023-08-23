import { SpecialtyFailure } from "domain/core/failures/specialty/specialtyFailure";
import { IGetSpecialtiesResponse, IGetSpecialtyResponse } from "domain/core/response/specialtiesResponse";

export interface IAutocompleteInputSpecialtiesState {
    specialties: IGetSpecialtiesState;
    specialty: IGetSpecialtyState;
}

interface IGetSpecialtiesState {
    data: IGetSpecialtiesResponse;
    loading: boolean;
    successful: boolean;
    error: SpecialtyFailure | null; 
}

interface IGetSpecialtyState {
    data: IGetSpecialtyResponse;
    loading: boolean;
    successful: boolean;
    error: SpecialtyFailure | null; 
}

export const initialState: IAutocompleteInputSpecialtiesState = {
    specialties: {
        data: {} as IGetSpecialtiesResponse,
        loading: false,
        successful: false,
        error: null,
    },
    specialty: {
        data: {} as IGetSpecialtyResponse,
        loading: false,
        successful: false,
        error: null,
    },
}