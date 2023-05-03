import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IStepsActions } from "./StepsActions";
import { StepsReducer } from "./StepsReducer";
import { IStepsState, initialState } from "./StepsState";

export interface IStepsContext {
  state: IStepsState;
  actions: IStepsActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const StepsContext = createContext<IStepsContext>(
  {} as IStepsContext
);

const StepsProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(StepsReducer, initialState);

  return (
    <StepsContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </StepsContext.Provider>
  );
};

export default StepsProvider;
