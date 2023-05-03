import { Failure } from "../failure";

export class PointFailure extends Failure {}

export const enum pointFailuresEnum {
  pointsNotFound = "POINTS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
