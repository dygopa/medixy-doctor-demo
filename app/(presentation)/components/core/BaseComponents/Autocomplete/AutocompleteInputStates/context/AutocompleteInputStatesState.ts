import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { FederalEntityFailure } from "domain/core/failures/federalEntity/federalEntityFailure";

export interface IAutocompleteInputStatesState {
    federalEntities: IGetFederalEntitiesState;
}

interface IGetFederalEntitiesState {
    data: IFederalEntity[];
    loading: boolean;
    successful: boolean;
    error: FederalEntityFailure | null; 
}

export const initialState: IAutocompleteInputStatesState = {
    federalEntities: {
        data: [],
        loading: false,
        successful: false,
        error: null,
    },
}