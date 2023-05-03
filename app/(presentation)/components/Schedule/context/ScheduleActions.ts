import ScheduleUseCase from "domain/useCases/schedule/scheduleUseCase";
import { Dispatch } from "react";

export interface IScheduleActions {
    changeTypePopup: Function;
    changeStatusPopup: Function;
}

const changeTypePopup = (value:number) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CHANGE_TYPE_ACTIVE_POPUP", payload: { data: value } });
}
const changeStatusPopup = (value:boolean) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: "CHANGE_STATUS_POPUP", payload: { data: value } });
}

export const actions: IScheduleActions = {
    changeTypePopup,
    changeStatusPopup
}
