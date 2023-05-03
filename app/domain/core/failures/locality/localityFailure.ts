import { Failure } from "../failure";

export class LocalityFailure extends Failure {}

export const enum localityFailuresEnum {
  localitiesNotFound = "LOCALITIES_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
