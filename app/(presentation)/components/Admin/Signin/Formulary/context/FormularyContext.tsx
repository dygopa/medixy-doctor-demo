import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IFormularyActions } from "./FormularyActions";
import { FormularyReducer } from "./FormularyReducer";
import { IFormularyState, initialState } from "./FormularyState";

export interface IFormularyContext {
  state: IFormularyState;
  actions: IFormularyActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const FormularyContext = createContext<IFormularyContext>(
  {} as IFormularyContext
);

const FormularyProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(FormularyReducer, initialState);

  return (
    <FormularyContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </FormularyContext.Provider>
  );
};

export default FormularyProvider;
