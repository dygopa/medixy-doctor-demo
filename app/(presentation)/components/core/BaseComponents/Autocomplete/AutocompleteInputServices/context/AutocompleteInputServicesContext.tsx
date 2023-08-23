import React, { Dispatch, useReducer, createContext } from "react";
import {
  IAutocompleteInputServicesActions,
  actions,
} from "./AutocompleteInputServicesActions";
import {
  IAutocompleteInputServicesState,
  initialState,
} from "./AutocompleteInputServicesState";
import { AutocompleteInputServicesReducer } from "./AutocompleteInputServicesReducer";

export interface IAutocompleteInputServicesContext {
  state: IAutocompleteInputServicesState;
  actions: IAutocompleteInputServicesActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteInputServicesContext =
  createContext<IAutocompleteInputServicesContext>(
    {} as IAutocompleteInputServicesContext
  );

const AutocompleteInputServicesProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    AutocompleteInputServicesReducer,
    initialState
  );

  return (
    <AutocompleteInputServicesContext.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {children}
    </AutocompleteInputServicesContext.Provider>
  );
};

export default AutocompleteInputServicesProvider;
