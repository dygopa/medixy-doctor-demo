import { Failure } from "../failure";

export class SpecialtyFailure extends Failure {}

export const enum specialtyFailuresEnum {
  serverError = "SERVER_ERROR"
}
