import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IUserCardActions } from "./UserCardActions";
import { UserCardReducer } from "./UserCardReducer";
import { IUserCardState, initialState } from "./UserCardState";

export interface IUserCardContext {
  state: IUserCardState;
  actions: IUserCardActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const UserCardContext = createContext<IUserCardContext>(
  {} as IUserCardContext
);

const UserCardProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(UserCardReducer, initialState);

  return (
    <UserCardContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </UserCardContext.Provider>
  );
};

export default UserCardProvider;
