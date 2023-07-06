import { Dispatch, createContext, useReducer } from "react";
import {
  IMedicalRecordsListActions,
  actions,
} from "./MedicalRecordsListActions";
import {
  IMedicalRecordsListState,
  initialState,
} from "./MedicalRecordsListState";
import { MedicalRecordsListReducer } from "./MedicalRecordsListReducer";

export interface IMedicalRecordsListContext {
  state: IMedicalRecordsListState;
  actions: IMedicalRecordsListActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const MedicalRecordsListContext =
  createContext<IMedicalRecordsListContext>({} as IMedicalRecordsListContext);

const MedicalRecordsListProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(MedicalRecordsListReducer, initialState);

  return (
    <MedicalRecordsListContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </MedicalRecordsListContext.Provider>
  );
};

export default MedicalRecordsListProvider;
