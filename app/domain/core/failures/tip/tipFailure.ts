import { Failure } from "../failure";

export class TipFailure extends Failure {}

export const enum tipFailuresEnum {
  tipsNotFound = "TIPS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
