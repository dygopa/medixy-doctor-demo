import { Failure } from "../failure";

export class MedicalConsultyFailure extends Failure {}

export const enum medicalConsultyFailuresEnum {
  serverError = "SERVER_ERROR"
}
