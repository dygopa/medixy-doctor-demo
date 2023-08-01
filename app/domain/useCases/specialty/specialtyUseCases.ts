import { ISpecialty } from "domain/core/entities/specialtyEntity";
import { SpecialtyFailure } from "domain/core/failures/specialty/specialtyFailure";
import { ICreateSpecialtyResponse, IGetSpecialtiesResponse } from "domain/core/response/specialtiesResponse";
import ISpecialtyRepository, { SpecialtyRepository } from "infrastructure/repositories/specialty/specialtyRepository";

export default class SpecialtyUseCase {
    private _repository: ISpecialtyRepository = new SpecialtyRepository();

    async getSpecialties(obj: { 
        skip?: number | null; 
        sort?: any; 
        limit?: number | null; 
        doctorId?: number | null;
        generics?: boolean | null;
        searchQuery?: string | null;
    }): Promise<IGetSpecialtiesResponse> {
        try {
            const response = await this._repository.getSpecialties({
                skip: obj.skip,
                sort: obj.sort,
                limit: obj.limit,
                doctorId: obj.doctorId,
                generics: obj.generics,
                searchQuery: obj.searchQuery,
            });

            if (response instanceof SpecialtyFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async createSpecialty(obj: { specialty: ISpecialty }): Promise<ICreateSpecialtyResponse> {
        try {
            const response = await this._repository.createSpecialty(obj.specialty);

            if (response instanceof SpecialtyFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}