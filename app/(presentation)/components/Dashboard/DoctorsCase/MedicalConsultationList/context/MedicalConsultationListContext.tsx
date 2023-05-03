import React, { createContext, Dispatch, useReducer } from "react";
import { initialState } from "./MedicalConsultationListState";
import {
  IMedicalConsultationListActions,
  actions,
} from "./MedicalConsultationListActions";
import { MedicalConsultationListReducer } from "./MedicalConsultationListReducer";
import { IMedicalConsultationListState } from "./MedicalConsultationListState";

export interface IMedicalConsultationListContext {
  state: IMedicalConsultationListState;
  actions: IMedicalConsultationListActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element[] | JSX.Element;
}

export const MedicalConsultationListContext =
  createContext<IMedicalConsultationListContext>(
    {} as IMedicalConsultationListContext
  );

const MedicalConsultationListProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    MedicalConsultationListReducer,
    initialState
  );

  return (
    <MedicalConsultationListContext.Provider
      value={{ state, actions, dispatch }}
    >
      {children}
    </MedicalConsultationListContext.Provider>
  );
};

export default MedicalConsultationListProvider;
