import AuthUseCase from "domain/useCases/auth/authUseCase";
import { Dispatch } from "react";

export interface IFormularyActions {
  signInUser: Function;
}

const signInUser = (obj: { email: string; password: string }) => async (dispatch: Dispatch<any>) => {
  try {
    console.log("SIGN_IN_USER_LOADING")
    dispatch({ type: "SIGN_IN_USER_LOADING" });

    const res: string = await new AuthUseCase().signInUser({ email: obj.email, password: obj.password });

    console.log("SIGN_IN_USER_SUCCESSFUL")
    dispatch({ type: "SIGN_IN_USER_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log(error)
    console.log("SIGN_IN_USER_ERROR")
    dispatch({ type: "SIGN_IN_USER_ERROR", payload: { error: error } });
  }
}

export const actions: IFormularyActions = {
  signInUser
}
