import { IUser } from "domain/core/entities/userEntity";
import AuthUseCase from "domain/useCases/auth/authUseCase";
import { redirect } from "next/navigation";
import { Dispatch } from "react";

export interface IAuthActions {
  getUserAuthenticated: Function;
  updateUserFCMToken: Function;
}

const getUserAuthenticated = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_USER_AUTHENTICATED_LOADING" });

    const res: IUser = await new AuthUseCase().getUserAuthenticated();

    dispatch({ type: "GET_USER_AUTHENTICATED_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_USER_AUTHENTICATED_ERROR", payload: { error: error } });
  }
}

const updateUserFCMToken = (obj:{ token: string | number; userId: string | number; }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_USER_FCM_TOKEN_LOADING" });

    const res: string = await new AuthUseCase().updateUserFCMToken(obj);

    dispatch({ type: "UPDATE_USER_FCM_TOKEN_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "UPDATE_USER_FCM_TOKEN_ERROR", payload: { error: error } });
  }
}

export const actions: IAuthActions = {
  getUserAuthenticated,
  updateUserFCMToken
}
