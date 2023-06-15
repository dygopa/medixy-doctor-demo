import { SpecialtyFailure } from "domain/core/failures/specialty/specialtyFailure";
import { IGetSpecialtiesResponse } from "domain/core/response/specialtiesResponse";
import ISpecialtyRepository, { SpecialtyRepository } from "infrastructure/repositories/specialty/specialtyRepository";

export default class SpecialtyUseCase {
    private _repository: ISpecialtyRepository = new SpecialtyRepository();

    async getSpecialties(obj: { 
        skip?: number | null; 
        sort?: any; 
        limit?: number | null; 
    }): Promise<IGetSpecialtiesResponse> {
        try {
            const response = await this._repository.getSpecialties({
                skip: obj.skip,
                sort: obj.sort,
                limit: obj.limit,
            });

            if (response instanceof SpecialtyFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}