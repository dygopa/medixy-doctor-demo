import { IPatient } from "domain/core/entities/patientEntity";
import PatientsUseCase from "domain/useCases/patient/patientUseCase";
import { Dispatch } from "react";

export interface IMedicalRecordActions {
    getPatientById: (patientId: number) => (dispatch: Dispatch<any>) => {};
}

const getPatientById = (patientId: number) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_PATIENT_LOADING" });

        const res: IPatient = await new PatientsUseCase().getPatientById(patientId);

        dispatch({ type: "GET_PATIENT_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_PATIENT_ERROR", payload: { error: error } });
    }
}

export const actions: IMedicalRecordActions = {
    getPatientById,
}