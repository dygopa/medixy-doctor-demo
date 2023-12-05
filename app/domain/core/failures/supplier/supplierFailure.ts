import { Failure } from "../failure";

export class SupplierFailure extends Failure {}

export const enum supplierFailuresEnum {
  emailAlreadyRegistered = "EMAIL_ALREADY_REGISTERED",
  serverError = "SERVER_ERROR"
}
