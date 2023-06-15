import { getSkipPagination } from "(presentation)/(helper)/paginate/paginateHelper";
import { ISubject } from "domain/core/entities/subjectEntity";
import { IGetSubjectsResponse } from "domain/core/response/subjectsResponse";
import SubjectsUseCase from "domain/useCases/subject/subjectUseCase";
import { Dispatch } from "react";

export interface ICompanionsListActions {
  getCompanions: Function,
  createCompanion: Function,
}

const getCompanions = (obj: { page?: number | null; limit: number; searchQuery?: string | undefined; patientId?:number; }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_COMPONIONS_LOADING" });

    const skip: number | null = getSkipPagination({ page: obj.page ?? 1, limit: obj.limit })
    
    const res: IGetSubjectsResponse = await new SubjectsUseCase().getSubjectsComponions({
      skip: skip,
      limit: obj.limit,
      searchQuery: obj.searchQuery,
    });

    dispatch({ type: "GET_COMPONIONS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_COMPONIONS_ERROR", payload: { error: error } });
  }
}

const createCompanion = (companion:ISubject) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CREATE_COMPANION_LOADING" });
    
    const res: boolean = await new SubjectsUseCase().createSubject(companion);

    dispatch({ type: "CREATE_COMPANION_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "CREATE_COMPANION_ERROR", payload: { error: error } });
  }
}

export const actions : ICompanionsListActions = {
  getCompanions,
  createCompanion,
}