import { IUser } from "domain/core/entities/userEntity";
import { IGetSubjectsResponse } from "domain/core/response/subjectsResponse";
import { IGetUsersResponse } from "domain/core/response/usersResponse";
import AppointmentUseCase from "domain/useCases/appointment/appointmentUseCases";
import SubjectsUseCase from "domain/useCases/subject/subjectUseCase";
import UserUseCase from "domain/useCases/user/userUseCase";
import { Dispatch } from "react";

export interface IDashboardActions {
    getTotalDoctors: () => (dispatch: Dispatch<any>) => {};
    getTotalSubjects: () => (dispatch: Dispatch<any>) => {};
    getTotalAppointments: () => (dispatch: Dispatch<any>) => {};
    getDoctors: () => (dispatch: Dispatch<any>) => {};
    getSubjects: () => (dispatch: Dispatch<any>) => {};
}

const getTotalDoctors = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_TOTAL_DOCTORS_LOADING" });
        
        const res: number = await new UserUseCase().getDoctorsCount({});
    
        dispatch({ type: "GET_TOTAL_DOCTORS_SUCCESSFUL", payload: { data: res } });
      } catch (error) {
        dispatch({ type: "GET_TOTAL_DOCTORS_ERROR", payload: { error: error } });
    }
}

const getTotalSubjects = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_TOTAL_PATIENTS_LOADING" });
        
        const res: number = await new SubjectsUseCase().getSubjectsCount({});
    
        dispatch({ type: "GET_TOTAL_PATIENTS_SUCCESSFUL", payload: { data: res } });
      } catch (error) {
        dispatch({ type: "GET_TOTAL_PATIENTS_ERROR", payload: { error: error } });
    }
}

const getTotalAppointments = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_TOTAL_APPOINTMENTS_LOADING" });
        
        const res: number = await new AppointmentUseCase().getAppointmentsCount({});
    
        dispatch({ type: "GET_TOTAL_APPOINTMENTS_SUCCESSFUL", payload: { data: res } });
      } catch (error) {
        dispatch({ type: "GET_TOTAL_APPOINTMENTS_ERROR", payload: { error: error } });
    }
}

const getDoctors = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_DOCTORS_LOADING" });

        const sort: any = { field: "fechaRegistro", ascending: true };
        
        const res: IGetUsersResponse = await new UserUseCase().getDoctors({ sort: sort, limit: 5 });
    
        dispatch({ type: "GET_DOCTORS_SUCCESSFUL", payload: { data: res.data } });
      } catch (error) {
        dispatch({ type: "GET_DOCTORS_ERROR", payload: { error: error } });
    }
}

const getSubjects = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({ type: "GET_PATIENTS_LOADING" });

        const sort: any = { field: "fechaRegistro", ascending: true };
        
        const res: IGetSubjectsResponse = await new SubjectsUseCase().getSubjects({ sort: sort, limit: 5 });
    
        dispatch({ type: "GET_PATIENTS_SUCCESSFUL", payload: { data: res } });
      } catch (error) {
        dispatch({ type: "GET_PATIENTS_ERROR", payload: { error: error } });
    }
}

export const actions : IDashboardActions = {
    getTotalDoctors,
    getTotalSubjects,
    getTotalAppointments,
    getDoctors,
    getSubjects,
}