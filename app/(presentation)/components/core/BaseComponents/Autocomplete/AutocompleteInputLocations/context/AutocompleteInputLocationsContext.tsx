import React, { Dispatch, useReducer, createContext } from "react";
import {
  IAutocompleteInputLocationsActions,
  actions,
} from "./AutocompleteInputLocationsActions";
import {
  IAutocompleteInputLocationsState,
  initialState,
} from "./AutocompleteInputLocationsState";
import { AutocompleteInputLocationsReducer } from "./AutocompleteInputLocationsReducer";

export interface IAutocompleteInputLocationsContext {
  state: IAutocompleteInputLocationsState;
  actions: IAutocompleteInputLocationsActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteInputLocationsContext =
  createContext<IAutocompleteInputLocationsContext>(
    {} as IAutocompleteInputLocationsContext
  );

const AutocompleteInputLocationsProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    AutocompleteInputLocationsReducer,
    initialState
  );

  return (
    <AutocompleteInputLocationsContext.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {children}
    </AutocompleteInputLocationsContext.Provider>
  );
};

export default AutocompleteInputLocationsProvider;
