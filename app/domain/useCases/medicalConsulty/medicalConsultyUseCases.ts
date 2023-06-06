import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { ICreateMedicalConsultyResponse, IGetMedicalConsultiesResponse } from "domain/core/response/medicalConsultyResponse";
import IDiagnosisRepository, { DiagnosisRepository } from "infrastructure/repositories/diagnosis/diagnosisRepository";
import { MedicalConsultyRepository } from "infrastructure/repositories/medicalConsulty/medicalConsultyRepository";
import IMedicalMeasureRepository, { MedicalMeasureRepository } from "infrastructure/repositories/medicalMeasure/medicalMeasureRepository";
import IMedicalRecordRepository, { MedicalRecordRepository } from "infrastructure/repositories/medicalRecord/medicalRecordRepository";
import ITreatmentRepository, { TreatmentRepository } from "infrastructure/repositories/treatment/treatmentRepository";

export default class MedicalConsultyUseCase {
  private _repository: MedicalConsultyRepository = new MedicalConsultyRepository();
  private _medicalMeasuresRepository: IMedicalMeasureRepository = new MedicalMeasureRepository();
  private _treatmentRepository: ITreatmentRepository = new TreatmentRepository();
  private _diagnosisRepository: IDiagnosisRepository = new DiagnosisRepository();
  private _medicalRecordRepository: IMedicalRecordRepository = new MedicalRecordRepository();

  async getMedicalConsulties(obj: { skip?: number | null; sort?: any; limit?: number | null; patientId?: number | null }): Promise<IGetMedicalConsultiesResponse> {
    try {
      const response = await this._repository.getMedicalConsulties({
        skip: obj.skip,
        sort: obj.sort,
        limit: obj.limit,
        patientId: obj.patientId
      });

      if (response instanceof MedicalConsultyFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

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

      if (medicalConsulty.treatments && medicalConsulty.treatments.length > 0) {
        await Promise.all((medicalConsulty.treatments.map(async (treatment) => {
          treatment.medicalConsultyId = response.data.id;

          await this._treatmentRepository.createTreatment(treatment);
        })))
      } 

      /* if (medicalConsulty.diagnose && medicalConsulty.diagnose.length > 0) {
        await Promise.all((medicalConsulty.diagnose.map(async (diagnosis) => {
          diagnosis.medicalConsultyId = response.data.id;
          await this._diagnosisRepository.createDiagnosis(diagnosis);
        })))
      }

      if (medicalConsulty.medicalRecords && medicalConsulty.medicalRecords.length > 0) {
        await Promise.all((medicalConsulty.medicalRecords.map(async (medicalRecord) => {
          medicalRecord.medicalConsultyId = response.data.id;

          await this._medicalRecordRepository.createMedicalRecord(medicalRecord);
        })))
      } */

      return response
    } catch (error) {
      throw error;
    }
  }
}
