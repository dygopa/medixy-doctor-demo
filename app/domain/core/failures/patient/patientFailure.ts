import { Failure } from "../failure";

export class PatientFailure extends Failure {}

export const enum patientFailuresEnum {
  patientsNotFound = "PATIENTS_NOT_FOUND",
  serverError = "SERVER_ERROR"
}
