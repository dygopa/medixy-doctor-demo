import { ITreatment } from "domain/core/entities/treatmentEntity";
import { IUser } from "domain/core/entities/userEntity";
import { TreatmentFailure } from "domain/core/failures/treatment/treatmentFailure";
import { IGetTreatmentPDFResponse, IGetTreatmentsResponse } from "domain/core/response/treatmentResponses";
import ITreatmentRepository, { TreatmentRepository } from "infrastructure/repositories/treatment/treatmentRepository";

export default class TreatmentUseCase {
    private _repository: ITreatmentRepository = new TreatmentRepository();

    async getTreatments(obj: { skip?: number | null; sort?: any; limit?: number | null; subjectId?: number | null }): Promise<IGetTreatmentsResponse> {
        try {
            const response = await this._repository.getTreatments({
                skip: obj.skip,
                sort: obj.sort,
                limit: obj.limit,
                subjectId: obj.subjectId
            });

            if (response instanceof TreatmentFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getTreatmentPDF(obj: { doctor: IUser; treatment: ITreatment }): Promise<IGetTreatmentPDFResponse> {
        try {
            const response = await this._repository.getTreatmentPDF({
                doctor: obj.doctor,
                treatment: obj.treatment
            });

            if (response instanceof TreatmentFailure) throw response;

            return response;
        } catch (error) {
            throw error;
        }
    }
}