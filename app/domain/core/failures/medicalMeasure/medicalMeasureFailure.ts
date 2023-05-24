import { Failure } from "../failure";

export class MedicalMeasureFailure extends Failure {}

export const enum medicalMeasureFailuresEnum {
  serverError = "SERVER_ERROR"
}
