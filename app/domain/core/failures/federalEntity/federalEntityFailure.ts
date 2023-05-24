import { Failure } from "../failure";

export class FederalEntityFailure extends Failure {}

export const enum federalEntityFailuresEnum {
  federalEntitiesNotFound = "FEDERAL_ENTITIES_NOT_FOUND",
  serverError = "SERVER_ERROR"
}