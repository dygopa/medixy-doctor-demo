import { Failure } from "../failure";

export class ClaimFailure extends Failure {}

export const enum claimFailuresEnum {
  claimsNotFound = "CLAIMS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
