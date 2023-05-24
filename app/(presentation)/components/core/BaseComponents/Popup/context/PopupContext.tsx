import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IPopupActions } from "./PopupActions";
import { PopupReducer } from "./PopupReducer";
import { initialState, IPopupState } from "./PopupState";

export interface IPopupContext {
  state: IPopupState;
  actions: IPopupActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const PopupContext = createContext<IPopupContext>(
  {} as IPopupContext
);

const PopupProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(PopupReducer, initialState);

  return (
    <PopupContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupProvider;
