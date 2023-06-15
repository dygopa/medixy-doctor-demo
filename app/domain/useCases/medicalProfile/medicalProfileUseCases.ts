import { MedicalProfileFailure } from "domain/core/failures/medicalProfile/medicalProfileFailure";
import { IGetMedicalProfilesResponse } from "domain/core/response/medicalProfileResponse";
import { MedicalProfileRepository } from "infrastructure/repositories/medicalProfile/medicalProfileRepository";

export default class MedicalProfileUseCase {
  private _repository: MedicalProfileRepository = new MedicalProfileRepository();

  async getMedicalProfiles(obj: { skip?: number | null; sort?: any; limit?: number | null; searchQuery?: string | null }): Promise<IGetMedicalProfilesResponse> {
    try {
      const response = await this._repository.getMedicalProfiles({
        skip: obj.skip,
        sort: obj.sort,
        limit: obj.limit,
        searchQuery: obj.searchQuery
      });

      if (response instanceof MedicalProfileFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }
}
