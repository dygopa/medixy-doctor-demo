import { AuthFailure } from "domain/core/failures/auth/authFailure";
import { OTPFailure } from "domain/core/failures/otp/otpFailure";

export interface IRecoveryPasswordState {
  getDoctorOTPCode: IGetDoctorOTPCodeState;
  sendDoctorOTPCode: ISendDoctorOTPCodeState;
  updatePassword: IUpdatePasswordState;
}

interface IGetDoctorOTPCodeState {
  loading: boolean;
  successful: boolean;
  error: OTPFailure | null; 
}

interface ISendDoctorOTPCodeState {
  loading: boolean;
  successful: boolean;
  error: OTPFailure | null; 
}

interface IUpdatePasswordState {
  loading: boolean;
  successful: boolean;
  error: AuthFailure | null; 
}

export const initialState: IRecoveryPasswordState = {
   getDoctorOTPCode: {
    loading: false,
    successful: false,
    error: null,
  },
  sendDoctorOTPCode: {
    loading: false,
    successful: false,
    error: null,
  },
  updatePassword: {
    loading: false,
    successful: false,
    error: null,
  },
}