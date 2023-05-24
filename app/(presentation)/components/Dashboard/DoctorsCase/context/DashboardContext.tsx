import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IDashboardActions } from "./DashboardActions";
import { DashboardReducer } from "./DashboardReducer";
import { IDashboardState, initialState } from "./DashboardState";

export interface IDashboardContext {
  state: IDashboardState;
  actions: IDashboardActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const DashboardContext = createContext<IDashboardContext>(
  {} as IDashboardContext
);

const DashboardProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(DashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
