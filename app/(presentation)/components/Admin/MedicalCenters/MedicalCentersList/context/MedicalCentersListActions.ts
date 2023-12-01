import { IGetSuppliersResponse } from "domain/core/response/suppliersResponse";
import SupplierUseCase from "domain/useCases/supplier/supplierUseCase";
import { Dispatch } from "react";

export interface IMedicalCentersListActions {
    getMedicalCenters: () => (dispatch: Dispatch<any>) => {};
}

const getMedicalCenters = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_MEDICAL_CENTERS_LOADING" });
        
        const res: IGetSuppliersResponse = await new SupplierUseCase().getSuppliers({
          typeSupplierId: 2
        });
    
        dispatch({ type: "GET_MEDICAL_CENTERS_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_MEDICAL_CENTERS_ERROR", payload: { error: error } });
    }
}

export const actions : IMedicalCentersListActions = {
    getMedicalCenters,
}