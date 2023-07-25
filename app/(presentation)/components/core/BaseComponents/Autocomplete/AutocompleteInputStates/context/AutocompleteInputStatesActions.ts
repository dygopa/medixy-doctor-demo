import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import FederalEntitiesUseCase from "domain/useCases/federalEntity/federalEntityUseCase";
import { Dispatch } from "react";

export interface IAutocompleteInputStatesActions {
    getFederalEntities: (obj: { searchQuery?: string | null }) => (dispatch: Dispatch<any>) => {};
    getFederalEntityById: (obj: { id: number }) => (dispatch: Dispatch<any>) => {};
}

const getFederalEntities = (obj: { searchQuery?: string | null }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_FEDERAL_ENTITIES_LOADING" });

        const res: IFederalEntity[] = await new FederalEntitiesUseCase().getFederalEntities({ searchQuery: obj.searchQuery, limit: 100 })

        dispatch({ type: "GET_FEDERAL_ENTITIES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_FEDERAL_ENTITIES_ERROR", payload: { error: error } });
    }
}

const getFederalEntityById = (obj: { id: number }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_FEDERAL_ENTITY_LOADING" });

        const res: IFederalEntity = await new FederalEntitiesUseCase().getFederalEntityById({ id: obj.id });

        dispatch({ type: "GET_FEDERAL_ENTITY_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_FEDERAL_ENTITY_ERROR", payload: { error: error } });
    }
}

export const actions: IAutocompleteInputStatesActions = {
    getFederalEntities,
    getFederalEntityById
}