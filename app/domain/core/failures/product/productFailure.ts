import { Failure } from "../failure";

export class ProductFailure extends Failure {}

export const enum productFailuresEnum {
  productsNotFound = "PRODUCTS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
