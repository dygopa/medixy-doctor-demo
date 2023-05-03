import { Failure } from "../failure";

export class CountryFailure extends Failure {}

export const enum countryFailuresEnum {
  countriesNotFound = "COUNTRIES_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
