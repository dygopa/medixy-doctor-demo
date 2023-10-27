import { Failure } from "../failure";

export class EmailFailure extends Failure {}

export const enum emailFailuresEnum {
  serverError = "SERVER_ERROR"
}
