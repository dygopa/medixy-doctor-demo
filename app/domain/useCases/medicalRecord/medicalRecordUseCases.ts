import { MedicalRecordFailure } from "domain/core/failures/medicalRecord/medicalRecordFailure";
import { IGetMedicalRecordsResponse } from "domain/core/response/medicalRecordResponse";
import IMedicalRecordRepository, { MedicalRecordRepository } from "infrastructure/repositories/medicalRecord/medicalRecordRepository";

export default class MedicalRecordUseCase {
    private _repository: IMedicalRecordRepository = new MedicalRecordRepository();

    async getMedicalRecords(obj: { skip?: number | null; sort?: any; limit?: number | null; patientId?: number | null; medicalRecordType?: number | null }): Promise<IGetMedicalRecordsResponse> {
        try {
            const response = await this._repository.getMedicalRecords({
                skip: obj.skip,
                sort: obj.sort,
                limit: obj.limit,
                patientId: obj.patientId,
                medicalRecordType: obj.medicalRecordType
            });

            if (response instanceof MedicalRecordFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}