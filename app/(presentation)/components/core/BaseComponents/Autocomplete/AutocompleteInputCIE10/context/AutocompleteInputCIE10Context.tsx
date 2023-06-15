import React, { Dispatch, useReducer, createContext } from "react";
import {
  IAutocompleteInputCIE10Actions,
  actions,
} from "./AutocompleteInputCIE10Actions";
import {
  IAutocompleteInputCIE10State,
  initialState,
} from "./AutocompleteInputCIE10State";
import { AutocompleteInputCIE10Reducer } from "./AutocompleteInputCIE10Reducer";

export interface IAutocompleteInputCIE10Context {
  state: IAutocompleteInputCIE10State;
  actions: IAutocompleteInputCIE10Actions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteInputCIE10Context =
  createContext<IAutocompleteInputCIE10Context>(
    {} as IAutocompleteInputCIE10Context
  );

const AutocompleteInputCIE10Provider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    AutocompleteInputCIE10Reducer,
    initialState
  );

  return (
    <AutocompleteInputCIE10Context.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {children}
    </AutocompleteInputCIE10Context.Provider>
  );
};

export default AutocompleteInputCIE10Provider;
