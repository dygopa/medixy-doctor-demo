import React, { Dispatch, useReducer, createContext } from "react";
import {
  actions,
  IAutocompleteInputMedicalProfilesActions,
} from "./AutocompleteInputMedicalProfilesActions";
import {
  IAutocompleteInputMedicalProfilesState,
  initialState,
} from "./AutocompleteInputMedicalProfilesState";
import { AutocompleteInputMedicalProfilesReducer } from "./AutocompleteInputMedicalProfilesReducer";

export interface IAutocompleteInputMedicalProfilesContext {
  state: IAutocompleteInputMedicalProfilesState;
  actions: IAutocompleteInputMedicalProfilesActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteInputMedicalProfilesContext =
  createContext<IAutocompleteInputMedicalProfilesContext>(
    {} as IAutocompleteInputMedicalProfilesContext
  );

const AutocompleteInputMedicalProfilesProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    AutocompleteInputMedicalProfilesReducer,
    initialState
  );

  return (
    <AutocompleteInputMedicalProfilesContext.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {children}
    </AutocompleteInputMedicalProfilesContext.Provider>
  );
};

export default AutocompleteInputMedicalProfilesProvider;
