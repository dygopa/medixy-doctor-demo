import { Failure } from "../failure";

export class MedicalRecordFailure extends Failure {}

export const enum medicalRecordFailuresEnum {
  serverError = "SERVER_ERROR"
}
