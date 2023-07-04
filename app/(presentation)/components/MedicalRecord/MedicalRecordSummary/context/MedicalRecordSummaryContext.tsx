import React, { Dispatch, useReducer, createContext } from "react";
import {
  IMedicalRecordSummaryActions,
  actions,
} from "./MedicalRecordSummaryActions";
import {
  IMedicalRecordSummaryState,
  initialState,
} from "./MedicalRecordSummaryState";
import { MedicalRecordSummaryReducer } from "./MedicalRecordSummaryReducer";

export interface IMedicalRecordSummaryContext {
  state: IMedicalRecordSummaryState;
  actions: IMedicalRecordSummaryActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const MedicalRecordSummaryContext =
  createContext<IMedicalRecordSummaryContext>(
    {} as IMedicalRecordSummaryContext
  );

const MedicalRecordSummaryProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    MedicalRecordSummaryReducer,
    initialState
  );

  return (
    <MedicalRecordSummaryContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </MedicalRecordSummaryContext.Provider>
  );
};

export default MedicalRecordSummaryProvider;
