import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IServicesActions } from "./ServicesActions";
import { ServicesReducer } from "./ServicesReducer";
import { IServicesState, initialState } from "./ServicesState";

export interface IServicesContext {
  state: IServicesState;
  actions: IServicesActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const ServicesContext = createContext<IServicesContext>(
  {} as IServicesContext
);

const ServicesProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(ServicesReducer, initialState);

  return (
    <ServicesContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;
