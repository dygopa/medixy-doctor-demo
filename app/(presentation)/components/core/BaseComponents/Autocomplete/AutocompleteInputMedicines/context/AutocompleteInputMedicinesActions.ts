import { IGetMedicinesResponse } from "domain/core/response/medicineResponse";
import MedicinesUseCase from "domain/useCases/medicine/medicineUseCases";
import { Dispatch } from "react";

export interface IAutocompleteInputMedicinesActions {
    getMedicines: (obj: { searchQuery: string; }) => (dispatch: Dispatch<any>) => {};
}

const getMedicines = (obj: { searchQuery: string; }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_MEDICINES_LOADING" });

        const res: IGetMedicinesResponse = await new MedicinesUseCase().getMedicines({ searchQuery: obj.searchQuery, limit: 100 });

        dispatch({ type: "GET_MEDICINES_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_MEDICINES_ERROR", payload: { error: error } });
    }
}

export const actions: IAutocompleteInputMedicinesActions = {
    getMedicines,
}