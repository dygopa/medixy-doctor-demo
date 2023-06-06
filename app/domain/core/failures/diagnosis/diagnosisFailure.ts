import { Failure } from "../failure";

export class DiagnosisFailure extends Failure {}

export const enum diagnosisFailuresEnum {
  serverError = "SERVER_ERROR"
}
