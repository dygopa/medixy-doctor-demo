import { ICreateSupplier } from "domain/core/entities/supplierEntity";
import { ICreateSupplierResponse } from "domain/core/response/suppliersResponse";
import SupplierUseCase from "domain/useCases/supplier/supplierUseCase";
import { Dispatch } from "react";

export interface IMedicalCentersCreateActions {
    createMedicalCenter: (obj: { createMedicalCenter: ICreateSupplier }) => (dispatch: Dispatch<any>) => {};
}

const createMedicalCenter = (obj: { createMedicalCenter: ICreateSupplier }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "CREATE_MEDICAL_CENTER_LOADING" });
        
        const res: ICreateSupplierResponse = await new SupplierUseCase().createSupplier({
          createSupplier: obj.createMedicalCenter
        });
    
        dispatch({ type: "CREATE_MEDICAL_CENTER_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "CREATE_MEDICAL_CENTER_ERROR", payload: { error: error } });
    }
}

export const actions : IMedicalCentersCreateActions = {
    createMedicalCenter,
}