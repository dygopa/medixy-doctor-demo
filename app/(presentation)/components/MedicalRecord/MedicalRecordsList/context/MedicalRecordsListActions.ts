import { getSkipPagination } from "(presentation)/(helper)/paginate/paginateHelper";
import { IGetMedicalConsultiesResponse } from "domain/core/response/medicalConsultyResponse";
import MedicalConsultyUseCase from "domain/useCases/medicalConsulty/medicalConsultyUseCases";
import { Dispatch } from "react";

export interface IMedicalRecordsListActions {
    getMedicalConsulties: (obj: { doctorId: number; page?: number | null; limit: number; searchQuery?: string | null; sinceAt?: Date | null; untilAt?: Date | null }) => (dispatch: Dispatch<any>) => {};
}

const getMedicalConsulties = (obj: { doctorId: number; page?: number | null; limit: number; searchQuery?: string | null; sinceAt?: Date | null; untilAt?: Date | null }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_MEDICAL_CONSULTIES_LOADING" });

        const skip: number | null = getSkipPagination({ page: obj.page ?? 1, limit: obj.limit })

        const sort: any = { field: "fechaConsulta", ascending: false };
        
        const res: IGetMedicalConsultiesResponse = await new MedicalConsultyUseCase().getMedicalConsulties({
          searchQuery: obj.searchQuery,
          doctorId: obj.doctorId,
          sinceAt: obj.sinceAt,
          untilAt: obj.untilAt,
          skip: skip,
          sort: sort,
          limit: obj.limit,
        });
    
        dispatch({ type: "GET_MEDICAL_CONSULTIES_SUCCESSFUL", payload: { data: res } });
      } catch (error) {
        dispatch({ type: "GET_MEDICAL_CONSULTIES_ERROR", payload: { error: error } });
      }
}

export const actions: IMedicalRecordsListActions = {
    getMedicalConsulties,
}