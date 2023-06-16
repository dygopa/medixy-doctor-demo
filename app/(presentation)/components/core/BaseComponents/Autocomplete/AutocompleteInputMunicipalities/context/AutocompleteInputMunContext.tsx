import React, { Dispatch, useReducer, createContext } from "react";
import {
  IAutocompleteInputMunActions,
  actions,
} from "./AutocompleteInputMunActions";
import {
  IAutocompleteInputMunState,
  initialState,
} from "./AutocompleteInputMunState";
import { AutocompleteInputMunReducer } from "./AutocompleteInputMunReducer";

export interface IAutocompleteInputMunContext {
  state: IAutocompleteInputMunState;
  actions: IAutocompleteInputMunActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteInputMunContext =
  createContext<IAutocompleteInputMunContext>(
    {} as IAutocompleteInputMunContext
  );

const AutocompleteInputMunProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    AutocompleteInputMunReducer,
    initialState
  );

  return (
    <AutocompleteInputMunContext.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {children}
    </AutocompleteInputMunContext.Provider>
  );
};

export default AutocompleteInputMunProvider;
