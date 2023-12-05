import { Dispatch, createContext, useReducer } from "react";
import {
  IMedicalCentersListActions,
  actions,
} from "./MedicalCentersListActions";
import {
  IMedicalCentersListState,
  initialState,
} from "./MedicalCentersListState";
import { MedicalCentersListReducer } from "./MedicalCentersListReducer";

export interface IMedicalCentersListContext {
  state: IMedicalCentersListState;
  actions: IMedicalCentersListActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const MedicalCentersListContext =
  createContext<IMedicalCentersListContext>({} as IMedicalCentersListContext);

const MedicalCentersListProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(MedicalCentersListReducer, initialState);

  return (
    <MedicalCentersListContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </MedicalCentersListContext.Provider>
  );
};

export default MedicalCentersListProvider;
