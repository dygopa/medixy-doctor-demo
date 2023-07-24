import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IRecoveryPasswordActions } from "./RecoveryPasswordActions";
import { RecoveryPasswordReducer } from "./RecoveryPasswordReducer";
import { IRecoveryPasswordState, initialState } from "./RecoveryPasswordState";

export interface IRecoveryPasswordContext {
  state: IRecoveryPasswordState;
  actions: IRecoveryPasswordActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const RecoveryPasswordContext = createContext<IRecoveryPasswordContext>(
  {} as IRecoveryPasswordContext
);

const RecoveryPasswordProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(RecoveryPasswordReducer, initialState);

  return (
    <RecoveryPasswordContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </RecoveryPasswordContext.Provider>
  );
};

export default RecoveryPasswordProvider;
