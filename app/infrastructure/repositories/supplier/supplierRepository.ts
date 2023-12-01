import { ICreateSupplier, IPictureSupplier, ISupplier, IUpdateSupplier } from "domain/core/entities/supplierEntity";
import { serviceFailuresEnum } from "domain/core/failures/service/serviceFailure";
import { SupplierFailure } from "domain/core/failures/supplier/supplierFailure";
import { ICreateSupplierResponse, IGetSupplierResponse, IGetSuppliersResponse, IUpdateSupplierResponse } from "domain/core/response/suppliersResponse";
import { supplierApiToEntity, supplierCreateEntityToMap, supplierUpdateEntityToMap, supplierUpdatePictureEntityToMap } from "domain/mappers/supplier/api/supplierApiMapper";
import { Http } from "infrastructure/helper/http/http";
import { HttpResponse } from "infrastructure/helper/http/httpResponse";
import nookies from 'nookies';

export default interface ISupplierRepository {
    getSuppliers(obj: { typeSupplierId?: number | null }): Promise<IGetSuppliersResponse | SupplierFailure>;
    getSupplierById(obj: { supplierId: number }): Promise<IGetSupplierResponse | SupplierFailure>;
    createSupplier(obj: { createSupplier: ICreateSupplier }): Promise<ICreateSupplierResponse | SupplierFailure>;
    updateSupplier(obj: { supplierId: number; updateSupplier: IUpdateSupplier }): Promise<IUpdateSupplierResponse | SupplierFailure>;
    updateSupplierAvatar(obj: { supplierId: number; picture: IPictureSupplier }): Promise<IUpdateSupplierResponse | SupplierFailure>;
}

export class SupplierRepository implements ISupplierRepository {
    async getSuppliers(obj: { typeSupplierId?: number | null }): Promise<IGetSuppliersResponse | SupplierFailure> {
        try {
            const cookies = nookies.get(undefined, 'access_token');

            let headers = new Headers();
      
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${cookies["access_token"]}`);

            let query = "";

            if (obj.typeSupplierId) {
                query = query + `type_supplier_id=${obj.typeSupplierId}&`
            }

            const response: HttpResponse = await new Http().get({ uri: "/suppliers", headers: headers, query: query });

            if (response.metadata?.error) return new SupplierFailure(response.metadata.error.type);

            let suppliers: ISupplier[] = [];

            if (response.data && response.data.length > 0) {
               response.data.forEach((data: any) => {
                const supplier: ISupplier = supplierApiToEntity(data);

                if (supplier.supplierId > 0) suppliers.push(supplier);
               });
            }

            const getSuppliersResponse: IGetSuppliersResponse = {
                data: suppliers,
                metadata: {
                    total: 0,
                    limit: 0,
                }
            }

            return getSuppliersResponse;
        } catch (error) {
            const exception = error as any;
            return new SupplierFailure(serviceFailuresEnum.serverError);
        }
    }

    async getSupplierById(obj: { supplierId: number }): Promise<IGetSupplierResponse | SupplierFailure> {
        try {
            const cookies = nookies.get(undefined, 'access_token');

            let headers = new Headers();
      
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${cookies["access_token"]}`);

            const response: HttpResponse = await new Http().get({ uri: `/suppliers/${obj.supplierId}`, headers: headers });

            if (response.metadata?.error) return new SupplierFailure(response.metadata.error.type);

            let supplier: ISupplier = {} as ISupplier;

            if (response.data) supplier = supplierApiToEntity(response.data);

            const updateSupplierResponse: IUpdateSupplierResponse = {
                data: supplier,
                metadata: {}
            }

            return updateSupplierResponse;
        } catch (error) {
            const exception = error as any;
            return new SupplierFailure(serviceFailuresEnum.serverError);
        }
    }

    async createSupplier(obj: { createSupplier: ICreateSupplier }): Promise<ICreateSupplierResponse | SupplierFailure> {
        try {
            const cookies = nookies.get(undefined, 'access_token');

            let headers = new Headers();
      
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${cookies["access_token"]}`);

            const response: HttpResponse = await new Http().post({ uri: "/suppliers", headers: headers, body: supplierCreateEntityToMap(obj.createSupplier) });

            if (response.metadata?.error) return new SupplierFailure(response.metadata.error.type);

            const createSupplierResponse: ICreateSupplierResponse = {
                data: response.data.id,
                metadata: {}
            }

            return createSupplierResponse;
        } catch (error) {
            const exception = error as any;
            return new SupplierFailure(serviceFailuresEnum.serverError);
        }
    }

    async updateSupplier(obj: { supplierId: number; updateSupplier: IUpdateSupplier }): Promise<IUpdateSupplierResponse | SupplierFailure> {
        try {
            const cookies = nookies.get(undefined, 'access_token');

            let headers = new Headers();
      
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${cookies["access_token"]}`);

            const response: HttpResponse = await new Http().put({ uri: `/suppliers/${obj.supplierId}`, headers: headers, body: supplierUpdateEntityToMap(obj.updateSupplier) });

            if (response.metadata?.error) return new SupplierFailure(response.metadata.error.type);

            let supplier: ISupplier = {} as ISupplier;

            if (response.data && response.data.length > 0) supplier = supplierApiToEntity(response.data);

            const updateSupplierResponse: IUpdateSupplierResponse = {
                data: supplier,
                metadata: {}
            }

            return updateSupplierResponse;
        } catch (error) {
            const exception = error as any;
            return new SupplierFailure(serviceFailuresEnum.serverError);
        }
    }

    async updateSupplierAvatar(obj: { supplierId: number; picture: IPictureSupplier }): Promise<IUpdateSupplierResponse | SupplierFailure> {
        try {
            const cookies = nookies.get(undefined, 'access_token');

            let headers = new Headers();
      
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${cookies["access_token"]}`);

            const response: HttpResponse = await new Http().put({ uri: `/suppliers/${obj.supplierId}/avatar`, headers: headers, body: supplierUpdatePictureEntityToMap(obj.picture) });

            if (response.metadata?.error) return new SupplierFailure(response.metadata.error.type);

            let supplier: ISupplier = {} as ISupplier;

            if (response.data && response.data.length > 0) supplier = supplierApiToEntity(response.data);

            const updateSupplierResponse: IUpdateSupplierResponse = {
                data: supplier,
                metadata: {}
            }

            return updateSupplierResponse;
        } catch (error) {
            const exception = error as any;
            console.log(exception)
            return new SupplierFailure(serviceFailuresEnum.serverError);
        }
    }
}