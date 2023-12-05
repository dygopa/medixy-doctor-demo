import { SupplierFailure } from "domain/core/failures/supplier/supplierFailure";
import { IGetSuppliersResponse } from "domain/core/response/suppliersResponse";

export interface IMedicalCentersListState {
    medicalCenters: IGetMedicalCentersListState;
}

interface IGetMedicalCentersListState {
    data: IGetSuppliersResponse;
    loading: boolean;
    successful: boolean;
    error: SupplierFailure | null; 
}

export const initialState: IMedicalCentersListState= {
    medicalCenters: {
      data: {} as IGetSuppliersResponse,
      loading: false,
      successful: false,
      error: null,
    },
}