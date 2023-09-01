import React, { Dispatch, useReducer, createContext } from "react";
import {
  IAutocompleteInputPostalActions,
  actions,
} from "./AutocompleteInputPostalActions";
import {
  IAutocompleteInputPostalState,
  initialState,
} from "./AutocompleteInputPostalState";
import { AutocompleteInputPostalReducer } from "./AutocompleteInputPostalReducer";

export interface IAutocompleteInputPostalContext {
  state: IAutocompleteInputPostalState;
  actions: IAutocompleteInputPostalActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteInputPostalContext =
  createContext<IAutocompleteInputPostalContext>(
    {} as IAutocompleteInputPostalContext
  );

const AutocompleteInputPostalProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    AutocompleteInputPostalReducer,
    initialState
  );

  return (
    <AutocompleteInputPostalContext.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {children}
    </AutocompleteInputPostalContext.Provider>
  );
};

export default AutocompleteInputPostalProvider;
