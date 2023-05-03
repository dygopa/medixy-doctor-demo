import { Failure } from "../failure";

export class ServiceFailure extends Failure {}

export const enum serviceFailuresEnum {
  servicesNotFound = "SERVICES_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
