import { IUpdateSupplier } from "domain/core/entities/supplierEntity";
import { IGetSupplierResponse, IUpdateSupplierResponse } from "domain/core/response/suppliersResponse";
import SupplierUseCase from "domain/useCases/supplier/supplierUseCase";
import { Dispatch } from "react";

export interface IMedicalCentersEditActions {
    getMedicalCenterById: (obj: { supplierId: number; }) => (dispatch: Dispatch<any>) => {};
    updateMedicalCenter: (obj: { supplierId: number; updateMedicalCenter: IUpdateSupplier }) => (dispatch: Dispatch<any>) => {};
}

const getMedicalCenterById = (obj: { supplierId: number; }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_MEDICAL_CENTER_LOADING" });
        
        const res: IGetSupplierResponse = await new SupplierUseCase().getSupplierById({
          supplierId: obj.supplierId,
        });
    
        dispatch({ type: "GET_MEDICAL_CENTER_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_MEDICAL_CENTER_ERROR", payload: { error: error } });
    }
}

const updateMedicalCenter = (obj: { supplierId: number; updateMedicalCenter: IUpdateSupplier }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "UPDATE_MEDICAL_CENTER_LOADING" });
        
        const res: IUpdateSupplierResponse = await new SupplierUseCase().updateSupplier({
          supplierId: obj.supplierId,
          updateSupplier: obj.updateMedicalCenter
        });

        console.log(res)
    
        dispatch({ type: "UPDATE_MEDICAL_CENTER_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "UPDATE_MEDICAL_CENTER_ERROR", payload: { error: error } });
    }
}

export const actions : IMedicalCentersEditActions = {
    getMedicalCenterById,
    updateMedicalCenter,
}