import { getSkipPagination } from "(presentation)/(helper)/paginate/paginateHelper";
import { IGetSubjectsResponse } from "domain/core/response/subjectsResponse";
import SubjectsUseCase from "domain/useCases/subject/subjectUseCase";
import { Dispatch } from "react";

export interface ISubjectListActions {
    getSubjects: Function;
}

const getSubjects = (obj: { page?: number | null; limit: number; searchQuery?: string | undefined }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_PATIENTS_LOADING" });

        const skip: number | null = getSkipPagination({ page: obj.page ?? 1, limit: obj.limit })
        
        const res: IGetSubjectsResponse = await new SubjectsUseCase().getSubjects({
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

export const actions : ISubjectListActions = {
    getSubjects,
}