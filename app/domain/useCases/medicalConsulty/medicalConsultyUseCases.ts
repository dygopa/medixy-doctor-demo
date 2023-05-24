import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { ICreateMedicalConsultyResponse } from "domain/core/response/medicalConsultyResponse";
import { MedicalConsultyRepository } from "infrastructure/repositories/medicalConsulty/medicalConsultyRepository";
import IMedicalMeasureRepository, { MedicalMeasureRepository } from "infrastructure/repositories/medicalMeasure/medicalMeasureRepository";

export default class MedicalConsultyUseCase {
  private _repository: MedicalConsultyRepository = new MedicalConsultyRepository();
  private _medicalMeasuresRepository: IMedicalMeasureRepository = new MedicalMeasureRepository();

  async createMedicalConsulty(medicalConsulty: IMedicalConsulty): Promise<ICreateMedicalConsultyResponse> {
    try {
      const response = await this._repository.createMedicalConsulty(medicalConsulty);

      if (response instanceof MedicalConsultyFailure) throw response;

      if (medicalConsulty.medicalMeasures && medicalConsulty.medicalMeasures.length > 0) {
        await Promise.all((medicalConsulty.medicalMeasures.map(async (medicalMeasure) => {
          medicalMeasure.medicalConsultyId = response.data.id;

          await this._medicalMeasuresRepository.createMedicalMeasure(medicalMeasure);
        })))
      }

      return response
    } catch (error) {
      throw error;
    }
  }
}
