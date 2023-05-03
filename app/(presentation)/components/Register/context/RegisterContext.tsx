import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IRegisterActions } from "./RegisterActions";
import { RegisterReducer } from "./RegisterReducer";
import { IRegisterState, initialState } from "./RegisterState";

export interface IRegisterContext {
  state: IRegisterState;
  actions: IRegisterActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const RegisterContext = createContext<IRegisterContext>(
  {} as IRegisterContext
);

const RegisterProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(RegisterReducer, initialState);

  return (
    <RegisterContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;
