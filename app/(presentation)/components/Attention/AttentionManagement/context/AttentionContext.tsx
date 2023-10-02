import React, { Dispatch, useReducer, createContext } from "react";
import { IAttentionActions, actions } from "./AttentionActions";
import { IAttentionState, initialState } from "./AttentionState";
import { AttentionReducer } from "./AttentionReducer";

export interface IAttentionContext {
  state: IAttentionState;
  actions: IAttentionActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AttentionContext = createContext<IAttentionContext>(
  {} as IAttentionContext
);

const AttentionProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(AttentionReducer, initialState);

  return (
    <AttentionContext.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {children}
    </AttentionContext.Provider>
  );
};

export default AttentionProvider;
