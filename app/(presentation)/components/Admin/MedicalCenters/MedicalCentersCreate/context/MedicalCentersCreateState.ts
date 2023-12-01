import { SupplierFailure } from "domain/core/failures/supplier/supplierFailure";
import { ICreateSupplierResponse } from "domain/core/response/suppliersResponse";

export interface IMedicalCentersCreateState {
    createMedicalCenter: ICreateMedicalCenterState;
}

interface ICreateMedicalCenterState {
    data: ICreateSupplierResponse;
    loading: boolean;
    successful: boolean;
    error: SupplierFailure | null; 
}

export const initialState: IMedicalCentersCreateState = {
    createMedicalCenter: {
      data: {} as ICreateSupplierResponse,
      loading: false,
      successful: false,
      error: null,
    },
}