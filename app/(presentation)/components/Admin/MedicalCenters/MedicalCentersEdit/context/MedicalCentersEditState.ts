import { SupplierFailure } from "domain/core/failures/supplier/supplierFailure";
import { IGetSupplierResponse, IUpdateSupplierResponse } from "domain/core/response/suppliersResponse";

export interface IMedicalCentersEditState {
    getMedicalCenter: IGetMedicalCenterState;
    updateMedicalCenter: IUpdateMedicalCenterState;
}

interface IGetMedicalCenterState {
    data: IGetSupplierResponse;
    loading: boolean;
    successful: boolean;
    error: SupplierFailure | null; 
}

interface IUpdateMedicalCenterState {
    data: IUpdateSupplierResponse;
    loading: boolean;
    successful: boolean;
    error: SupplierFailure | null; 
}

export const initialState: IMedicalCentersEditState = {
    getMedicalCenter: {
        data: {} as IGetSupplierResponse,
        loading: false,
        successful: false,
        error: null,
    },
    updateMedicalCenter: {
      data: {} as IUpdateSupplierResponse,
      loading: false,
      successful: false,
      error: null,
    },
}