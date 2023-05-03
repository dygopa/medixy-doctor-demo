import { Failure } from "../failure";

export class AuthFailure extends Failure {}

export const enum authFailuresEnum {
  wrongPassword = "WRONG_PASSWORD",
  tooManyRequest = "TOO_MANY_REQUEST",
  userNotFound = "USER_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
