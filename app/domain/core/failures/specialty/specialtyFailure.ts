import { Failure } from "../failure";

export class SpecialtyFailure extends Failure {}

export const enum specialtyFailuresEnum {
  curpAlreadyRegister = "CURP_ALREADY_REGISTER",
  serverError = "SERVER_ERROR"
}
