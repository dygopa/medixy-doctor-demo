import { CIE10Failure } from "domain/core/failures/cie10/cie10Failure";
import { IGetCIE10ListResponse } from "domain/core/response/cie10Response";
import { CIE10Repository } from "infrastructure/repositories/cie10/cie10Repository";

export default class CIE10UseCase {
    private _repository: CIE10Repository = new CIE10Repository();

    async getCIE10(): Promise<IGetCIE10ListResponse> {
        try {
            const response = await this._repository.getCIE10();

            if (response instanceof CIE10Failure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}