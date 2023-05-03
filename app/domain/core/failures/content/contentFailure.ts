import { Failure } from "../failure";

export class ContentFailure extends Failure {}

export const enum contentFailuresEnum {
  contentsNotFound = "CONTENTS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
