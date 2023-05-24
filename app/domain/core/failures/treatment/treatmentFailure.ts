import { Failure } from "../failure";

export class TreatmentFailure extends Failure {}

export const enum treatmentFailuresEnum {
  serverError = "SERVER_ERROR"
}
