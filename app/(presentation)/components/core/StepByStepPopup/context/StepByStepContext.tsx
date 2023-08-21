import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IStepByStepActions } from "./StepByStepActions";
import { StepByStepReducer } from "./StepByStepReducer";
import { IStepByStepState, initialState } from "./StepByStepState";

export interface IStepByStepContext {
  state: IStepByStepState;
  actions: IStepByStepActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const StepByStepContext = createContext<IStepByStepContext>(
  {} as IStepByStepContext
);

const StepByStepProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(StepByStepReducer, initialState);

  return (
    <StepByStepContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </StepByStepContext.Provider>
  );
};

export default StepByStepProvider;
