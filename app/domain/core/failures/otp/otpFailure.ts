import { Failure } from "../failure";

export class OTPFailure extends Failure {}

export const enum otpFailuresEnum {
  emailNotFound = "EMAIL_NOT_FOUND",
  otpInvalid = "OTP_INVALID",
  serverError = "SERVER_ERROR"
}
