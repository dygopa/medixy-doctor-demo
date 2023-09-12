import { IAdmin } from "domain/core/entities/adminEntity";
import AuthUseCase from "domain/useCases/admin/auth/authUseCase";
import { Dispatch } from "react";

export interface IAuthActions {
  getUserAuthenticated: Function;
}

const getUserAuthenticated = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_USER_AUTHENTICATED_LOADING" });

    const res: IAdmin = await new AuthUseCase().getUserAuthenticated();

    dispatch({ type: "GET_USER_AUTHENTICATED_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_USER_AUTHENTICATED_ERROR", payload: { error: error } });
  }
}

export const actions: IAuthActions = {
  getUserAuthenticated
}
