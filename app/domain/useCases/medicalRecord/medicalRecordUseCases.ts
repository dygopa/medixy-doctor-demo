import { IMedicalRecord } from "domain/core/entities/medicalRecordEntity";
import { IUser } from "domain/core/entities/userEntity";
import { MedicalRecordFailure } from "domain/core/failures/medicalRecord/medicalRecordFailure";
import { IGetMedicalRecordPDFResponse, IGetMedicalRecordsResponse } from "domain/core/response/medicalRecordResponse";
import IMedicalRecordRepository, { MedicalRecordRepository } from "infrastructure/repositories/medicalRecord/medicalRecordRepository";

export default class MedicalRecordUseCase {
    private _repository: IMedicalRecordRepository = new MedicalRecordRepository();

    async getMedicalRecords(obj: { 
        skip?: number | null; 
        sort?: any; 
        limit?: number | null; 
        subjectId?: number | null; 
        medicalConsulty?: number | null;
        medicalRecordType?: number | null;
        medicalRecordCategory?: number | null;
    }): Promise<IGetMedicalRecordsResponse> {
        try {
            const response = await this._repository.getMedicalRecords({
                skip: obj.skip,
                sort: obj.sort,
                limit: obj.limit,
                medicalConsulty: obj.medicalConsulty,
                subjectId: obj.subjectId,
                medicalRecordType: obj.medicalRecordType,
                medicalRecordCategory: obj.medicalRecordCategory
            });

            if (response instanceof MedicalRecordFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getMedicalRecordDiagnosisPDF(obj: { doctor: IUser; medicalRecord: IMedicalRecord }): Promise<IGetMedicalRecordPDFResponse> {
        try {
            const response = await this._repository.getMedicalRecordDiagnosisPDF({
                doctor: obj.doctor,
                medicalRecord: obj.medicalRecord
            });

            if (response instanceof MedicalRecordFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getMedicalRecordSpecialityPDF(obj: { doctor: IUser; medicalRecord: IMedicalRecord }): Promise<IGetMedicalRecordPDFResponse> {
        try {
            const response = await this._repository.getMedicalRecordSpecialityPDF({
                doctor: obj.doctor,
                medicalRecord: obj.medicalRecord
            });

            if (response instanceof MedicalRecordFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getMedicalRecordJustificativePDF(obj: { doctor: IUser; medicalRecord: IMedicalRecord }): Promise<IGetMedicalRecordPDFResponse> {
        try {
            const response = await this._repository.getMedicalRecordJustificativePDF({
                doctor: obj.doctor,
                medicalRecord: obj.medicalRecord
            });
            if (response instanceof MedicalRecordFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getMedicalRecordCertificatePDF(obj: { doctor: IUser; medicalRecord: IMedicalRecord }): Promise<IGetMedicalRecordPDFResponse> {
        try {
            const response = await this._repository.getMedicalRecordCertificatePDF({
                doctor: obj.doctor,
                medicalRecord: obj.medicalRecord
            });
            if (response instanceof MedicalRecordFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getMedicalRecordHospitalizationPDF(obj: { doctor: IUser; medicalRecord: IMedicalRecord }): Promise<IGetMedicalRecordPDFResponse> {
        try {
            console.log(obj)
            const response = await this._repository.getMedicalRecordHospitalizationPDF({
                doctor: obj.doctor,
                medicalRecord: obj.medicalRecord
            });
            if (response instanceof MedicalRecordFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}