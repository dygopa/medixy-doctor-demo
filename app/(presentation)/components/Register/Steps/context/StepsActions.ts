import RegisterUseCase from "domain/useCases/register/registerUseCase";
import { Dispatch } from "react";

export interface IStepsActions {
  changeStep: Function;
}

const changeStep = (step:number) => (dispatch: Dispatch<any>) => dispatch({ type: "CHANGED_STEP", payload: { data: step + 1 } });

export const actions: IStepsActions = {
  changeStep
}
