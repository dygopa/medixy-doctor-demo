import React, { Dispatch, useReducer, createContext } from "react";
import {
  IMedicalRecordCreateActions,
  actions,
} from "./MedicalRecordCreateActions";
import {
  IMedicalRecordCreateState,
  initialState,
} from "./MedicalRecordCreateState";
import { MedicalRecordCreateReducer } from "./MedicalRecordCreateReducer";

export interface IMedicalRecordCreateContext {
  state: IMedicalRecordCreateState;
  actions: IMedicalRecordCreateActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const MedicalRecordCreateContext =
  createContext<IMedicalRecordCreateContext>({} as IMedicalRecordCreateContext);

const MedicalRecordCreateProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    MedicalRecordCreateReducer,
    initialState
  );

  return (
    <MedicalRecordCreateContext.Provider
      value={{
        state,
        actions,
        dispatch,
      }}
    >
      {children}
    </MedicalRecordCreateContext.Provider>
  );
};

export default MedicalRecordCreateProvider;
