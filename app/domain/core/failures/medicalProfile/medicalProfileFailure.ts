import { Failure } from "../failure";

export class MedicalProfileFailure extends Failure {}

export const enum medicalProfileFailuresEnum {
  serverError = "SERVER_ERROR"
}
