import React, { Dispatch, useReducer, createContext } from "react";
import { IAutocompleteActions, actions } from "./AutocompleteActions";
import { IAutocompleteState, initialState } from "./AutocompleteState";
import { AutocompleteReducer } from "./AutocompleteReducer";

export interface IAutocompleteContext {
  state: IAutocompleteState;
  actions: IAutocompleteActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteContext = createContext<IAutocompleteContext>(
  {} as IAutocompleteContext
);

const AutocompleteProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(AutocompleteReducer, initialState);

  return (
    <AutocompleteContext.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {children}
    </AutocompleteContext.Provider>
  );
};

export default AutocompleteProvider;
