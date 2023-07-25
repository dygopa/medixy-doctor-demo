import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { FederalEntityFailure } from "domain/core/failures/federalEntity/federalEntityFailure";

export interface IAutocompleteInputStatesState {
    federalEntities: IGetFederalEntitiesState;
    federalEntity: IGetFederalEntityState;
}

interface IGetFederalEntitiesState {
    data: IFederalEntity[];
    loading: boolean;
    successful: boolean;
    error: FederalEntityFailure | null; 
}

interface IGetFederalEntityState {
    data: IFederalEntity;
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
    federalEntity: {
        data: {} as IFederalEntity,
        loading: false,
        successful: false,
        error: null,
    },
}