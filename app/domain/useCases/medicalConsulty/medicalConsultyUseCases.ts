import { MedicalRecordStatusEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { IUser } from "domain/core/entities/userEntity";
import { MedicalConsultyFailure } from "domain/core/failures/medicalConsulty/medicalConsultyFailure";
import { TreatmentFailure } from "domain/core/failures/treatment/treatmentFailure";
import { ICreateMedicalConsultyResponse, IGetMedicalConsultiesResponse, IGetMedicalConsultyPDFResponse } from "domain/core/response/medicalConsultyResponse";
import IAppointmentRepository, { AppointmentRepository } from "infrastructure/repositories/appointment/appointmentRepository";
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
  private _appointmentRepository: IAppointmentRepository = new AppointmentRepository();

  async getMedicalConsulties(obj: { skip?: number | null; sort?: any; limit?: number | null; doctorId?: number | null; subjectId?: number | null; searchQuery?: string | null; sinceAt?: Date | null; untilAt?: Date | null }): Promise<IGetMedicalConsultiesResponse> {
    try {
      const response = await this._repository.getMedicalConsulties({
        skip: obj.skip,
        sort: obj.sort,
        limit: obj.limit,
        searchQuery: obj.searchQuery,
        doctorId: obj.doctorId,
        subjectId: obj.subjectId,
        sinceAt: obj.sinceAt,
        untilAt: obj.untilAt,
      });

      if (response instanceof MedicalConsultyFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getMedicalConsultyById(consultyId:number): Promise<IMedicalConsulty> {
    try {
      const response = await this._repository.getMedicalConsultiesById(consultyId);

      if (response instanceof MedicalConsultyFailure) throw response;

      return response;
    } catch (error) {
      throw error;
    }
  }

  async createMedicalConsulty(obj: { doctor: IUser; medicalConsulty: IMedicalConsulty; appointmentId?: string | null }): Promise<ICreateMedicalConsultyResponse> {
    try {
      const response = await this._repository.createMedicalConsulty(obj.medicalConsulty);

      if (response instanceof MedicalConsultyFailure) throw response;

      if (obj.appointmentId) await this._appointmentRepository.editAppointmentStatus({ appointmentId: obj.appointmentId, status: MedicalRecordStatusEnum.COMPLETE });

      if (obj.medicalConsulty.medicalMeasures && obj.medicalConsulty.medicalMeasures.length > 0) {
        await Promise.all((obj.medicalConsulty.medicalMeasures.map(async (medicalMeasure) => {
          medicalMeasure.medicalConsultyId = response.data.id;

          await this._medicalMeasuresRepository.createMedicalMeasure(medicalMeasure);
        })))
      }

      if (obj.medicalConsulty.treatments && obj.medicalConsulty.treatments.length > 0) {
        await Promise.all((obj.medicalConsulty.treatments.map(async (treatment) => {
          treatment.medicalConsultyId = response.data.id;

          await this._treatmentRepository.createTreatment(treatment);
        })))
      } 

      if (obj.medicalConsulty.diagnose && obj.medicalConsulty.diagnose.length > 0) {
        await Promise.all((obj.medicalConsulty.diagnose.map(async (diagnosis) => {
          diagnosis.medicalConsultyId = response.data.id;
          await this._diagnosisRepository.createDiagnosis(diagnosis);
        })))
      }

      if (obj.medicalConsulty.medicalRecords && obj.medicalConsulty.medicalRecords.length > 0) {
        await Promise.all((obj.medicalConsulty.medicalRecords.map(async (medicalRecord) => {
          medicalRecord.medicalConsultyId = response.data.id;

          await this._medicalRecordRepository.createMedicalRecord(medicalRecord);
        })))
      } 

      if (obj.medicalConsulty.medicalConsultyImages && obj.medicalConsulty.medicalConsultyImages.length > 0) {
        await Promise.all((obj.medicalConsulty.medicalConsultyImages.map(async (medicalConsultyImage) => {
          medicalConsultyImage.medicalConsultyId = response.data.id;

          await this._repository.createMedicalConsultyImage(medicalConsultyImage);
        })))
      } 

      if (obj.medicalConsulty.treatments && obj.medicalConsulty.treatments.length > 0) {

        let urlPDF = await this._treatmentRepository.getTreatmentPDFReturnURL({doctor: obj.doctor, treatment: obj.medicalConsulty.treatments[0]})

        urlPDF = urlPDF.replace("data:application/pdf;base64,", "");

        console.log(urlPDF)

        await this._appointmentRepository.finishedAppointment({
          trataimentId: obj.medicalConsulty.treatments[0].id ?? null,
          trataimentPDF: urlPDF ?? null,
          appointmentId: obj.appointmentId ? obj.appointmentId : "",
        })
      } else {

        await this._appointmentRepository.finishedAppointment({
          trataimentId: null,
          trataimentPDF: null,
          appointmentId: obj.appointmentId ? obj.appointmentId : "",
        })
      }

      return response
    } catch (error) {
      throw error;
    }
  }

  async getMedicalConsultyPDF(obj: { doctor: IUser; medicalConsulty: IMedicalConsulty }): Promise<IGetMedicalConsultyPDFResponse> {
    try {
        const response = await this._repository.getMedicalConsultyPDF({
            doctor: obj.doctor,
            medicalConsulty: obj.medicalConsulty
        });

        if (response instanceof MedicalConsultyFailure) throw response;

        return response;
    } catch (error) {
        throw error;
    }
  }
}
