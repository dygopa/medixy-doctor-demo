import { Failure } from "../failure";

export class PromotionFailure extends Failure {}

export const enum promotionFailuresEnum {
  promotionsNotFound = "PROMOTIONS_CATEGORIES_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
