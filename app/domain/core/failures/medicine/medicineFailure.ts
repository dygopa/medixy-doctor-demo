import { Failure } from "../failure";

export class MedicineFailure extends Failure {}

export const enum medicineFailuresEnum {
  serverError = "SERVER_ERROR"
}
