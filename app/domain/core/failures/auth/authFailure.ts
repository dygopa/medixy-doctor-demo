import { Failure } from "../failure";

export class AuthFailure extends Failure {}

export const enum authFailuresEnum {
  notAuthenticated = "NOT_AUTHENTICATED",
  wrongPassword = "WRONG_PASSWORD",
  tooManyRequest = "TOO_MANY_REQUEST",
  userNotFound = "INVALID_CREDENTIALS",
  badGateway = "BAD_GATEWAY",
  tokenExpired = "TOKEN_EXPIRED",
  serverError = "SERVER_ERROR"
}