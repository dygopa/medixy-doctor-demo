import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IUserActions } from "./UserActions";
import { UserReducer } from "./UserReducer";
import { IUserState, initialState } from "./UserState";

export interface IUserContext {
  state: IUserState;
  actions: IUserActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const UserContext = createContext<IUserContext>(
  {} as IUserContext
);

const UserProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
