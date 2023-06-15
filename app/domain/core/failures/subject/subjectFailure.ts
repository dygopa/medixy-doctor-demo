import { Failure } from "../failure";

export class SubjectFailure extends Failure {}

export const enum subjectFailuresEnum {
  subjectsNotFound = "PATIENTS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
