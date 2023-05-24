import React, { Dispatch, useReducer, createContext } from "react";
import {
  IMedicalRecordCreateSummaryActions,
  actions,
} from "./MedicalRecordCreateSummaryActions";
import {
  IMedicalRecordCreateSummaryState,
  initialState,
} from "./MedicalRecordCreateSummaryState";
import { MedicalRecordCreateSummaryReducer } from "./MedicalRecordCreateSummaryReducer";

export interface IMedicalRecordCreateSummaryContext {
  state: IMedicalRecordCreateSummaryState;
  actions: IMedicalRecordCreateSummaryActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const MedicalRecordCreateSummaryContext =
  createContext<IMedicalRecordCreateSummaryContext>(
    {} as IMedicalRecordCreateSummaryContext
  );

const MedicalRecordCreateSummaryProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    MedicalRecordCreateSummaryReducer,
    initialState
  );

  return (
    <MedicalRecordCreateSummaryContext.Provider
      value={{ state, actions, dispatch }}
    >
      {children}
    </MedicalRecordCreateSummaryContext.Provider>
  );
};

export default MedicalRecordCreateSummaryProvider;
