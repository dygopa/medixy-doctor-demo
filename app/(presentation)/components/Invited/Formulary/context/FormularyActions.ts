import AuthUseCase from "domain/useCases/auth/authUseCase";
import { Dispatch } from "react";

export interface IFormularyActions {
  checkOTP: Function;
  updateUserOTP: Function;
  changeStep: Function;
}

const checkOTP = (code:string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CHECK_OTP_LOADING" });

    const res: string = await new AuthUseCase().checkOTP(code);

    dispatch({ type: "CHECK_OTP_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "CHECK_OTP_ERROR", payload: { error: error } });
  }
}

const updateUserOTP = (obj: { email: string; password: string }) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UDPATE_USER_OTP_LOADING" });

    const res: any = await new AuthUseCase().updateUserOTP({ email: obj.email, password: obj.password });

    dispatch({ type: "UDPATE_USER_OTP_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "UDPATE_USER_OTP_ERROR", payload: { error: error } });
  }
}

const changeStep = (step:number) => (dispatch: Dispatch<any>) => dispatch({ type: "CHANGED_STEP", payload: { data: step + 1 } });

export const actions: IFormularyActions = {
  checkOTP,
  updateUserOTP,
  changeStep
}
