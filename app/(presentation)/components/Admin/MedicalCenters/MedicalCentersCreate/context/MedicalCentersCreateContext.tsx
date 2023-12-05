import { Dispatch, createContext, useReducer } from "react";
import {
  IMedicalCentersCreateActions,
  actions,
} from "./MedicalCentersCreateActions";
import {
  IMedicalCentersCreateState,
  initialState,
} from "./MedicalCentersCreateState";
import { MedicalCentersCreateReducer } from "./MedicalCentersCreateReducer";

export interface IMedicalCentersCreateContext {
  state: IMedicalCentersCreateState;
  actions: IMedicalCentersCreateActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const MedicalCentersCreateContext =
  createContext<IMedicalCentersCreateContext>(
    {} as IMedicalCentersCreateContext
  );

const MedicalCentersCreateProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    MedicalCentersCreateReducer,
    initialState
  );

  return (
    <MedicalCentersCreateContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </MedicalCentersCreateContext.Provider>
  );
};

export default MedicalCentersCreateProvider;
