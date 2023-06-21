import { MedicineFailure } from "domain/core/failures/medicine/medicineFailure";
import { IGetMedicinesResponse } from "domain/core/response/medicineResponse";
import IMedicineRepository, { MedicineRepository } from "infrastructure/repositories/medicine/medicineRepository";

export default class MedicineUseCase {
    private _repository: IMedicineRepository = new MedicineRepository();

    async getMedicines(obj: { 
        page?: number | null; 
        sort?: any; 
        limit?: number | null; 
        searchQuery?: string | null; 
    }): Promise<IGetMedicinesResponse> {
        try {
            const response = await this._repository.getMedicines({
                page: obj.page,
                sort: obj.sort,
                limit: obj.limit,
                searchQuery: obj.searchQuery,
            });

            if (response instanceof MedicineFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}