import { ICreateSupplierResponse, IGetSupplierResponse, IGetSuppliersResponse, IUpdateSupplierResponse } from "domain/core/response/suppliersResponse";
import { SupplierRepository } from "infrastructure/repositories/supplier/supplierRepository";
import { SupplierFailure } from "domain/core/failures/supplier/supplierFailure";
import { ICreateSupplier, IUpdateSupplier } from "domain/core/entities/supplierEntity";

export default class SupplierUseCase {
  private _repository: SupplierRepository = new SupplierRepository();

  async getSuppliers(obj: { typeSupplierId?: number | null }): Promise<IGetSuppliersResponse> {
    try {
      const response = await this._repository.getSuppliers({ typeSupplierId: obj.typeSupplierId });

      if (response instanceof SupplierFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getSupplierById(obj: { supplierId: number }): Promise<IGetSupplierResponse> {
    try {
      const response = await this._repository.getSupplierById({ supplierId: obj.supplierId });

      if (response instanceof SupplierFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createSupplier(obj: { createSupplier: ICreateSupplier }): Promise<ICreateSupplierResponse> {
    try {
      const response = await this._repository.createSupplier({ createSupplier: obj.createSupplier });

      if (response instanceof SupplierFailure) throw response;

      if (obj.createSupplier.picture) {
        await this._repository.updateSupplierAvatar({ supplierId: parseInt(response.data.toString(), 10), picture: obj.createSupplier.picture });
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateSupplier(obj: { supplierId: number; updateSupplier: IUpdateSupplier }): Promise<IUpdateSupplierResponse> {
    try {
      const response = await this._repository.updateSupplier({ supplierId: obj.supplierId, updateSupplier: obj.updateSupplier });

      if (response instanceof SupplierFailure) throw response;

      if (obj.updateSupplier.picture) {
        await this._repository.updateSupplierAvatar({ supplierId: obj.supplierId, picture: obj.updateSupplier.picture });
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
}
