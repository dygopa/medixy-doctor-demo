import { IUser } from "domain/core/entities/userEntity";
import AuthUseCase from "domain/useCases/auth/authUseCase";
import { redirect } from "next/navigation";
import { Dispatch } from "react";

export interface IAuthActions {
  getUserAuthenticated: Function;
}

const getUserAuthenticated = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_USER_AUTHENTICATED_LOADING" });

    const resLocal: IUser = await new AuthUseCase().getUserAuthenticated();

    if (resLocal && resLocal.userId) dispatch({ type: "GET_USER_AUTHENTICATED_SUCCESSFUL", payload: { data: resLocal } });

    const res: IUser = await new AuthUseCase().getUserAuthenticatedAPI();

    dispatch({ type: "GET_USER_AUTHENTICATED_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_USER_AUTHENTICATED_ERROR", payload: { error: error } });
  }
}



export const actions: IAuthActions = {
  getUserAuthenticated,
}
