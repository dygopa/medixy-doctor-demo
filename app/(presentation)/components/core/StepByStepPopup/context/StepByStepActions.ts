import { IService } from "domain/core/entities/serviceEntity";
import ServiceUseCase from "domain/useCases/service/serviceUseCase";
import StepByStepUseCase from "domain/useCases/stepByStep/stepByStepUseCase";
import { Dispatch } from "react";

export interface IStepByStepActions {
    getSteps: Function;
    getStepsMessage: Function;
    createUserSteps: Function;
    changeOpenPopup: Function;
    changeOpenPopupText: Function;
    changeOpenPopupDisabledButton: Function;
    // getService: Function;
}

const createUserSteps = (id:string, event:string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "REGISTER_STEP_LOADING" });

    const res: string = await new StepByStepUseCase().createUserSteps(id, event);

    dispatch({ type: "REGISTER_STEP_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "REGISTER_STEP_ERROR", payload: { error: error } });
  }
}

const getSteps = (id:string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_STEPS_LOADING" });

    const res: string = await new StepByStepUseCase().getSteps(id);

    dispatch({ type: "GET_STEPS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_STEPS_ERROR", payload: { error: error } });
  }
}

const getStepsMessage = (id:string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_STEPS_MESSAGES_LOADING" });

    const res: string = await new StepByStepUseCase().getSteps(id);

    dispatch({ type: "GET_STEPS_MESSAGES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_STEPS_MESSAGES_ERROR", payload: { error: error } });
  }
}

/* const getService = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SERVICE_LOADING" });

    const res: IService[] = await new ServiceUseCase().getUserBaseServices(id);

    dispatch({ type: "GET_SERVICE_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "GET_SERVICE_ERROR", payload: { error: error } });
  }
} */

const changeOpenPopup = (value:boolean) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "CHANGE_OPEN_POPUP_TEXT", payload: { data: null } });
  dispatch({ type: "CHANGE_OPEN_POPUP", payload: { data: value } });
}

const changeOpenPopupText = (value:string) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "CHANGE_OPEN_POPUP_TEXT", payload: { data: value } });
}

const changeOpenPopupDisabledButton = (value:boolean) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: "CHANGE_OPEN_POPUP_DISABLED_BUTTON", payload: { data: value } });
}

export const actions: IStepByStepActions = {
  getSteps,
  getStepsMessage,
  createUserSteps,
  changeOpenPopup,
  changeOpenPopupText,
  changeOpenPopupDisabledButton,
  //getService,
}
