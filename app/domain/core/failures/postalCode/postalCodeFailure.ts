import { Failure } from "../failure";

export class PostalCodeFailure extends Failure {}

export const enum postalCodeFailuresEnum {
  serverError = "SERVER_ERROR"
}
