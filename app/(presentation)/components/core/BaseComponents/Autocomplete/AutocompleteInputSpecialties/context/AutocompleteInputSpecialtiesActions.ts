import { IGetSpecialtiesResponse, IGetSpecialtyResponse } from "domain/core/response/specialtiesResponse";
import SpecialtyUseCase from "domain/useCases/specialty/specialtyUseCases";
import { Dispatch } from "react";

export interface IAutocompleteInputSpecialtiesActions {
    getSpecialties: (obj: { searchQuery?: string | null; doctorId?: number | null }) => (dispatch: Dispatch<any>) => {};
    getSpecialtyById: (obj: { id: number }) => (dispatch: Dispatch<any>) => {};
}

const getSpecialties = (obj: { searchQuery?: string | null; doctorId?: number | null }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_SPECIALTIES_LOADING" });

        console.log(obj)

        const res: IGetSpecialtiesResponse = await new SpecialtyUseCase().getSpecialties({ searchQuery: obj.searchQuery, limit: 200, generics: true, doctorId: obj.doctorId });

        dispatch({ type: "GET_SPECIALTIES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_SPECIALTIES_ERROR", payload: { error: error } });
    }
}

const getSpecialtyById = (obj: { id: number }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_SPECIALTY_LOADING" });

        const res: IGetSpecialtyResponse = await new SpecialtyUseCase().getSpecialtyById({ id: obj.id });

        dispatch({ type: "GET_SPECIALTY_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_SPECIALTY_ERROR", payload: { error: error } });
    }
}

export const actions: IAutocompleteInputSpecialtiesActions = {
    getSpecialties,
    getSpecialtyById,
}