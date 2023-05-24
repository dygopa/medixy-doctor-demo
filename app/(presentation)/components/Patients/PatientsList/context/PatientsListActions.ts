import { getSkipPagination } from "(presentation)/(helper)/paginate/paginateHelper";
import { IGetPatientsResponse } from "domain/core/response/patientsResponse";
import PatientsUseCase from "domain/useCases/patient/patientUseCase";
import { Dispatch } from "react";

export interface IPatientListActions {
    getPatients: Function;
}

const getPatients = (obj: { page?: number | null; limit: number; searchQuery?: string | undefined }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_PATIENTS_LOADING" });

        const skip: number | null = getSkipPagination({ page: obj.page ?? 1, limit: obj.limit })
        
        const res: IGetPatientsResponse = await new PatientsUseCase().getPatients({
          skip: skip,
          limit: obj.limit,
          searchQuery: obj.searchQuery
        });
    
        dispatch({ type: "GET_PATIENTS_SUCCESSFUL", payload: { data: res } });
      } catch (error) {
        console.log("Error calling action", error)
        dispatch({ type: "GET_PATIENTS_ERROR", payload: { error: error } });
      }
}

export const actions : IPatientListActions = {
    getPatients,
}