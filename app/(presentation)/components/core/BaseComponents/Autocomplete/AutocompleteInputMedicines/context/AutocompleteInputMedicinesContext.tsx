import React, { Dispatch, useReducer, createContext } from "react";
import {
  IAutocompleteInputMedicinesActions,
  actions,
} from "./AutocompleteInputMedicinesActions";
import {
  IAutocompleteInputMedicinesState,
  initialState,
} from "./AutocompleteInputMedicinesState";
import { AutocompleteInputMedicinesReducer } from "./AutocompleteInputMedicinesReducer";

export interface IAutocompleteInputMedicinesContext {
  state: IAutocompleteInputMedicinesState;
  actions: IAutocompleteInputMedicinesActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AutocompleteInputMedicinesContext =
  createContext<IAutocompleteInputMedicinesContext>(
    {} as IAutocompleteInputMedicinesContext
  );

const AutocompleteInputMedicinesProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    AutocompleteInputMedicinesReducer,
    initialState
  );

  return (
    <AutocompleteInputMedicinesContext.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {children}
    </AutocompleteInputMedicinesContext.Provider>
  );
};

export default AutocompleteInputMedicinesProvider;
