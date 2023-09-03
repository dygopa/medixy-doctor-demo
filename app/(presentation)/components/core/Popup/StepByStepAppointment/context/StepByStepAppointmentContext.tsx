import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IStepByStepAppointmentActions } from "./StepByStepAppointmentActions";
import { StepByStepAppointmentReducer } from "./StepByStepAppointmentReducer";
import { IStepByStepAppointmentState, initialState } from "./StepByStepAppointmentState";

export interface IStepByStepAppointmentContext {
  state: IStepByStepAppointmentState;
  actions: IStepByStepAppointmentActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const StepByStepAppointmentContext = createContext<IStepByStepAppointmentContext>(
  {} as IStepByStepAppointmentContext
);

const StepByStepAppointmentProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(StepByStepAppointmentReducer, initialState);

  return (
    <StepByStepAppointmentContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </StepByStepAppointmentContext.Provider>
  );
};

export default StepByStepAppointmentProvider;
