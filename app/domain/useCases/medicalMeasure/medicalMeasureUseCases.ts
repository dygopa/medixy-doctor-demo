import { IMedicalMeasure } from "domain/core/entities/medicalMeasureEntity";
import { MedicalMeasureFailure } from "domain/core/failures/medicalMeasure/medicalMeasureFailure";
import { ICreateMedicalMeasureResponse, IGetMedicalMeasuresResponse } from "domain/core/response/medicalMeasureResponses";
import { MedicalMeasureRepository } from "infrastructure/repositories/medicalMeasure/medicalMeasureRepository";

export default class MedicalMeasureUseCase {
  private _repository: MedicalMeasureRepository = new MedicalMeasureRepository();

  async getMedicalMeasures(obj: { skip?: number | null; sort?: any; limit?: number | null; subjectId?: number | null }): Promise<IGetMedicalMeasuresResponse> {
    try {
      const response = await this._repository.getMedicalMeasures({
        skip: obj.skip,
        sort: obj.sort,
        limit: obj.limit,
        subjectId: obj.subjectId
      });

      if (response instanceof MedicalMeasureFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createMedicalMeasure(medicalMeasure: IMedicalMeasure): Promise<ICreateMedicalMeasureResponse> {
    try {
      const response = await this._repository.createMedicalMeasure(medicalMeasure);

      if (response instanceof MedicalMeasureFailure) throw response;

      return response
    } catch (error) {
      throw error;
    }
  }
}
