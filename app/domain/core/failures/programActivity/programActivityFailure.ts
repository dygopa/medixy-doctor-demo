import { Failure } from "../failure";

export class ProgramActivityFailure extends Failure {}

export const enum programActivityFailuresEnum {
  programActivitiesNotFound = "PROGRAM_ACTIVITIES_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
