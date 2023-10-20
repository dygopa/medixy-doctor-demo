import { getSkipPagination } from "(presentation)/(helper)/paginate/paginateHelper";
import { IGetUsersResponse } from "domain/core/response/usersResponse";
import UserUseCase from "domain/useCases/user/userUseCase";
import { Dispatch } from "react";

export interface ISubjectListActions {
    getDoctors: Function;
}

const getDoctors = (obj: { page?: number | null; limit: number; searchQuery?: string | undefined }) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_DOCTORS_LOADING" });

        const skip: number | null = getSkipPagination({ page: obj.page ?? 1, limit: obj.limit, })
        
        const res: IGetUsersResponse = await new UserUseCase().getDoctors({
          skip: skip,
          limit: obj.limit,
          searchQuery: obj.searchQuery,
          sort: { field: "fechaRegistro", ascending: false }
        });
    
        dispatch({ type: "GET_DOCTORS_SUCCESSFUL", payload: { data: res } });
      } catch (error) {
        console.log("Error calling action", error)
        dispatch({ type: "GET_DOCTORS_ERROR", payload: { error: error } });
      }
}

export const actions : ISubjectListActions = {
    getDoctors,
}