import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IAuthActions } from "./AuthActions";
import { AuthReducer } from "./AuthReducer";
import { IAuthState, initialState } from "./AuthState";

export interface IAuthContext {
  state: IAuthState;
  actions: IAuthActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthContext = createContext<IAuthContext>(
  {} as IAuthContext
);

const AuthProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
