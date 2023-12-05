import { Dispatch, createContext, useReducer } from "react";
import {
  IMedicalCentersEditActions,
  actions,
} from "./MedicalCentersEditActions";
import {
  IMedicalCentersEditState,
  initialState,
} from "./MedicalCentersEditState";
import { MedicalCentersEditReducer } from "./MedicalCentersEditReducer";

export interface IMedicalCentersEditContext {
  state: IMedicalCentersEditState;
  actions: IMedicalCentersEditActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const MedicalCentersEditContext =
  createContext<IMedicalCentersEditContext>({} as IMedicalCentersEditContext);

const MedicalCentersEditProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(MedicalCentersEditReducer, initialState);

  return (
    <MedicalCentersEditContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </MedicalCentersEditContext.Provider>
  );
};

export default MedicalCentersEditProvider;
