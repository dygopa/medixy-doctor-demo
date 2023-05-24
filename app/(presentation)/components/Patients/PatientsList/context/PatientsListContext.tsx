import { Dispatch, createContext, useReducer } from "react";
import { IPatientListActions, actions } from "./PatientsListActions";
import { IPatientsListState, initialState } from "./PatientsListState";
import { PatientListReducer } from "./PatientsListReducer";

export interface IPatientsListContext {
  state: IPatientsListState;
  actions: IPatientListActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const PatientsListContext = createContext<IPatientsListContext> (
  {} as IPatientsListContext
);

const PatientsListProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(PatientListReducer, initialState);

  return (
    <PatientsListContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </PatientsListContext.Provider>
  );
}

export default PatientsListProvider;