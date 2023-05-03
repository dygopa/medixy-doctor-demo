import { Failure } from "../failure";

export class CallToActionFailure extends Failure {}

export const enum callToActionFailuresEnum {
  serverError = "SERVER_ERROR"
}
