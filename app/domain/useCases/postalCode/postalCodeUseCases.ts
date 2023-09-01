import { PostalCodeFailure } from "domain/core/failures/postalCode/postalCodeFailure";
import { IGetPostalCodesResponse, IGetPostalCodeResponse } from "domain/core/response/postalCodeResponse";
import { PostalCodeRepository } from "infrastructure/repositories/postalCode/postalCodeRepository";

export default class PostalCodesUseCase {
    private _repository: PostalCodeRepository = new PostalCodeRepository();

    async getPostalCodes(obj: { searchQuery?: string | null; limit?: number | null; federalEntityId?: number | null }): Promise<IGetPostalCodesResponse> {
        try {
            const response = await this._repository.getPostalCodes({ searchQuery: obj.searchQuery, limit: obj.limit, federalEntityId: obj.federalEntityId });

            if (response instanceof PostalCodeFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getPostalCodeById(obj: { id: number; }): Promise<IGetPostalCodeResponse> {
        try {
            const response = await this._repository.getPostalCodeById({ id: obj.id });

            if (response instanceof PostalCodeFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getPostalCodeByPostalCode(obj: { postalCode: string; }): Promise<IGetPostalCodeResponse> {
        try {
            const response = await this._repository.getPostalCodeByPostalCode({ postalCode: obj.postalCode });

            if (response instanceof PostalCodeFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}