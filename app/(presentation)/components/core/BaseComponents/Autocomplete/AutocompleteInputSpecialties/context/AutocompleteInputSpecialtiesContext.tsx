import React, { Dispatch, useReducer, createContext } from "react";
import {
  IAutocompleteInputSpecialtiesActions,
  actions,
} from "./AutocompleteInputSpecialtiesActions";
import {
  IAutocompleteInputSpecialtiesState,
  initialState,
} from "./AutocompleteInputSpecialtiesState";
import { AutocompleteInputSpecialtiesReducer } from "./AutocompleteInputSpecialtiesReducer";

export interface IAutocompleteInputSpecialtiesContext {
  state: IAutocompleteInputSpecialtiesState;
  actions: IAutocompleteInputSpecialtiesActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteInputSpecialtiesContext =
  createContext<IAutocompleteInputSpecialtiesContext>(
    {} as IAutocompleteInputSpecialtiesContext
  );

const AutocompleteInputSpecialtiesProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    AutocompleteInputSpecialtiesReducer,
    initialState
  );

  return (
    <AutocompleteInputSpecialtiesContext.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {children}
    </AutocompleteInputSpecialtiesContext.Provider>
  );
};

export default AutocompleteInputSpecialtiesProvider;
