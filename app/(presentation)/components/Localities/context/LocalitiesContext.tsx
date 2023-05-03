import React, { createContext, Dispatch, useReducer } from "react";
import { actions, ILocalitiesActions } from "./LocalitiesActions";
import { LocalitiesReducer } from "./LocalitiesReducer";
import { ILocalitiesState, initialState } from "./LocalitiesState";

export interface ILocalitiesContext {
  state: ILocalitiesState;
  actions: ILocalitiesActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const LocalitiesContext = createContext<ILocalitiesContext>(
  {} as ILocalitiesContext
);

const LocalitiesProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(LocalitiesReducer, initialState);

  return (
    <LocalitiesContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </LocalitiesContext.Provider>
  );
};

export default LocalitiesProvider;
