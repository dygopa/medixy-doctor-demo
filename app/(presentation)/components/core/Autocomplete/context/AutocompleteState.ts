import { ServiceFailure } from "domain/core/failures/service/serviceFailure";
import { SpecialtyFailure } from "domain/core/failures/specialty/specialtyFailure";
import { IAutocompleteData } from "./AutocompleteActions";


export interface IAutocompleteState {
    data: IGetDataState;
}

interface IGetDataState {
    data: IAutocompleteData[];
    loading: boolean;
    successful: boolean;
    error: ServiceFailure | SpecialtyFailure | null; 
}

export const initialState: IAutocompleteState = {
    data: {
        data: [],
        loading: false,
        successful: false,
        error: null,
    },
}