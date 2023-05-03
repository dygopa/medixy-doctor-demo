import { Failure } from "../failure";

export class AllyFailure extends Failure {}

export const enum allyFailuresEnum {
  alliesNotFound = "ALLIES_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
