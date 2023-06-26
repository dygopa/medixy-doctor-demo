import { Dispatch, createContext, useReducer } from "react";
import { ISubjectListActions, actions } from "./DoctorsListActions";
import { IDoctorsListState, initialState } from "./DoctorsListState";
import { PatientListReducer } from "./DoctorsListReducer";

export interface IDoctorsListContext {
  state: IDoctorsListState;
  actions: ISubjectListActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const DoctorsListContext = createContext<IDoctorsListContext> (
  {} as IDoctorsListContext
);

const DoctorsListProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(PatientListReducer, initialState);

  return (
    <DoctorsListContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </DoctorsListContext.Provider>
  );
}

export default DoctorsListProvider;