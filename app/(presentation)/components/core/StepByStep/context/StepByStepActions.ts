import StepByStepUseCase from "domain/useCases/stepByStep/stepByStepUseCase";
import { Dispatch } from "react";

export interface IStepByStepActions {
    getSteps: Function;
    createUserSteps: Function;
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
    console.log({ type: "GET_STEPS_LOADING" });
    dispatch({ type: "GET_STEPS_LOADING" });

    const res: string = await new StepByStepUseCase().getSteps(id);

    console.log({ type: "GET_STEPS_SUCCESSFUL", payload: { data: res } });
    dispatch({ type: "GET_STEPS_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log({ type: "GET_STEPS_ERROR", payload: { error: error } });
    dispatch({ type: "GET_STEPS_ERROR", payload: { error: error } });
  }
}

export const actions: IStepByStepActions = {
  getSteps,
  createUserSteps
}
