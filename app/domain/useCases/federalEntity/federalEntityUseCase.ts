import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { FederalEntityFailure } from "domain/core/failures/federalEntity/federalEntityFailure";
import { FederalEntityRepository } from "infrastructure/repositories/federalEntities/federalEntitiesRepository";

export default class FederalEntitiesUseCase {
    private _repository: FederalEntityRepository = new FederalEntityRepository();

    async getFederalEntities(): Promise<IFederalEntity[] > {
        try {
            const response = await this._repository.getFederalEntities();

            if (response instanceof FederalEntityFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}