import { Failure } from "../failure";

export class DashboardFailure extends Failure {}

export const enum dashboardFailuresEnum {
    serverError = "SERVER_ERROR"
}
