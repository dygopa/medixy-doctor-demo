import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { FederalEntityFailure } from "domain/core/failures/federalEntity/federalEntityFailure";
import { FederalEntityRepository } from "infrastructure/repositories/federalEntities/federalEntitiesRepository";

export default class FederalEntitiesUseCase {
    private _repository: FederalEntityRepository = new FederalEntityRepository();

    async getFederalEntities(obj: { searchQuery?: string | null, limit?: number | null }): Promise<IFederalEntity[] > {
        try {
            const response = await this._repository.getFederalEntities({ searchQuery: obj.searchQuery, limit: obj.limit });

            if (response instanceof FederalEntityFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getFederalEntityById(obj: { id: number; }): Promise<IFederalEntity> {
        try {
            const response = await this._repository.getFederalEntityById({ id: obj.id });

            if (response instanceof FederalEntityFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}