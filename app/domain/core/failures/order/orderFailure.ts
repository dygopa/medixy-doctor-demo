import { Failure } from "../failure";

export class OrderFailure extends Failure {}

export const enum orderFailuresEnum {
  ordersNotFound = "ORDERS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
