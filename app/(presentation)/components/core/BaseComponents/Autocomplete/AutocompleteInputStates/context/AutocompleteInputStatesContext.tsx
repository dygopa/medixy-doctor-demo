import React, { Dispatch, useReducer, createContext } from "react";
import {
  IAutocompleteInputStatesActions,
  actions,
} from "./AutocompleteInputStatesActions";
import {
  IAutocompleteInputStatesState,
  initialState,
} from "./AutocompleteInputStatesState";
import { AutocompleteInputStatesReducer } from "./AutocompleteInputStatesReducer";

export interface IAutocompleteInputStatesContext {
  state: IAutocompleteInputStatesState;
  actions: IAutocompleteInputStatesActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteInputStatesContext =
  createContext<IAutocompleteInputStatesContext>(
    {} as IAutocompleteInputStatesContext
  );

const AutocompleteInputStatesProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    AutocompleteInputStatesReducer,
    initialState
  );

  return (
    <AutocompleteInputStatesContext.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {children}
    </AutocompleteInputStatesContext.Provider>
  );
};

export default AutocompleteInputStatesProvider;
