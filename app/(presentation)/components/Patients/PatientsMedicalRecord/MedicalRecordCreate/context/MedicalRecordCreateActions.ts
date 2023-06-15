import { IPatient } from "domain/core/entities/subjectEntity";
import { IGetCIE10ListResponse } from "domain/core/response/cie10Response";
import CIE10UseCase from "domain/useCases/cie10/cie10UseCases";
import PatientsUseCase from "domain/useCases/subject/subjectUseCase";
import { Dispatch } from "react";

export interface IMedicalRecordCreateActions {
    getPatientById: (patientId: number) => (dispatch: Dispatch<any>) => {};
    getCIE10: () => (dispatch: Dispatch<any>) => {};
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

const getCIE10 = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_CIE10_LOADING" });

        const res: IGetCIE10ListResponse = await new CIE10UseCase().getCIE10();

        dispatch({ type: "GET_CIE10_SUCCESSFUL", payload: { data: res } });
    } catch (error) {
        dispatch({ type: "GET_CIE10_ERROR", payload: { error: error } });
    }
}

export const actions: IMedicalRecordCreateActions = {
    getPatientById,
    getCIE10,
}