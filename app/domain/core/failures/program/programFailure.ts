import { Failure } from "../failure";

export class ProgramFailure extends Failure {}

export const enum programFailuresEnum {
  programsNotFound = "PROGRAMS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
