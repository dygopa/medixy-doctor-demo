import { IServiceCategory } from "domain/core/entities/serviceEntity";
import ServiceUseCase from "domain/useCases/service/serviceUseCase";
import { Dispatch } from "react";

export interface IAutocompleteInputServicesActions {
    getServicesCategories: (obj: { searchQuery?: string | null; doctorId: number }) => (dispatch: Dispatch<any>) => {};
}

const getServicesCategories = (obj: { searchQuery?: string | null; doctorId: number }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_SERVICES_CATEGORIES_LOADING" });

        const res: IServiceCategory[] = await new ServiceUseCase().getCategoriesDoctor(obj.doctorId, obj.searchQuery);

        dispatch({ type: "GET_SERVICES_CATEGORIES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_SERVICES_CATEGORIES_ERROR", payload: { error: error } });
    }
}

export const actions: IAutocompleteInputServicesActions = {
    getServicesCategories,
}