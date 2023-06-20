import { MunicipalityFailure } from "domain/core/failures/municipality/municipalityFailure";
import { IGetMunicipalitiesResponse } from "domain/core/response/municipalityResponse";
import { MunicipalityRepository } from "infrastructure/repositories/municipality/municipalityRepository";

export default class MunicipalitiesUseCase {
    private _repository: MunicipalityRepository = new MunicipalityRepository();

    async getMunicipalities(obj: { limit?: number | null; federalEntityId?: number | null }): Promise<IGetMunicipalitiesResponse> {
        try {
            
            const response = await this._repository.getMunicipalities({ limit: obj.limit, federalEntityId: obj.federalEntityId });

            if (response instanceof MunicipalityFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}