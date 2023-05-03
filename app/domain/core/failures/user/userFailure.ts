import { Failure } from "../failure";

export class UserFailure extends Failure {}

export const enum userFailuresEnum {
  usersNotFound = "USERS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
