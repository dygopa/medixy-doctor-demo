import { IGetOTPCodeResponse, ISendOTPCodeResponse } from "domain/core/response/otpResponse";
import AuthUseCase from "domain/useCases/auth/authUseCase";
import OTPUseCase from "domain/useCases/otp/otpUseCases";
import { Dispatch } from "react";

export interface IRecoveryPasswordActions {
  getDoctorOTPCode: (email: string) => (dispatch: Dispatch<any>) => {};
  sendDoctorOTPCode: (email: string, otp: string) => (dispatch: Dispatch<any>) => {};
  updatePassword: (email: string, password: string, otp: string) => (dispatch: Dispatch<any>) => {};
}

const getDoctorOTPCode = (email: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_DOCTOR_OTP_CODE_LOADING" });

    const res: IGetOTPCodeResponse = await new OTPUseCase().getDoctorOTPCode(email);

    dispatch({ type: "GET_DOCTOR_OTP_CODE_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_DOCTOR_OTP_CODE_ERROR", payload: { error: error } });
  }
}

const sendDoctorOTPCode = (email: string, otp: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "SEND_DOCTOR_OTP_CODE_LOADING" });

    const res: ISendOTPCodeResponse = await new OTPUseCase().sendDoctorOTPCode(email, otp);

    dispatch({ type: "SEND_DOCTOR_OTP_CODE_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "SEND_DOCTOR_OTP_CODE_ERROR", payload: { error: error } });
  }
}

const updatePassword = (email: string, password: string, otp: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_PASSWORD_LOADING" });

    const res: any = await new AuthUseCase().updatePasswordByEmail({email, password, otp});

    dispatch({ type: "UPDATE_PASSWORD_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "UPDATE_PASSWORD_ERROR", payload: { error: error } });
  }
}

export const actions: IRecoveryPasswordActions = {
    getDoctorOTPCode,
    sendDoctorOTPCode,
    updatePassword
}
