import React, {
  Dispatch,
  useReducer,
  createContext,
  useState,
  SetStateAction,
} from "react";
import { IMedicalRecordActions, actions } from "./MedicalRecordActions";
import { IMedicalRecordState, initialState } from "./MedicalRecordState";
import { MedicalRecordReducer } from "./MedicalRecordReducer";

export interface IMedicalRecordContext {
  state: IMedicalRecordState;
  actions: IMedicalRecordActions;
  dispatch: Dispatch<any>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const MedicalRecordContext = createContext<IMedicalRecordContext>(
  {} as IMedicalRecordContext
);

const MedicalRecordProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(MedicalRecordReducer, initialState);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <MedicalRecordContext.Provider
      value={{
        state,
        actions,
        dispatch,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </MedicalRecordContext.Provider>
  );
};

export default MedicalRecordProvider;
