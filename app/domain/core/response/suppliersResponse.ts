import { ISupplier } from "../entities/supplierEntity";


export interface IGetSuppliersResponse {
    data: ISupplier[];
    metadata: {
        total: number;
        limit: number | null;
    }
}

export interface IGetSupplierResponse {
    data: ISupplier;
    metadata: {}
}

export interface ICreateSupplierResponse {
    data: string;
    metadata: {}
}

export interface IUpdateSupplierResponse {
    data: ISupplier;
    metadata: {}
}