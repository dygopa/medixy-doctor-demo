import React, {
  Dispatch,
  useReducer,
  createContext,
  useState,
  SetStateAction,
} from "react";
import {
  IMedicalRecordCreateActions,
  actions,
} from "./MedicalRecordCreateActions";
import {
  IMedicalRecordCreateState,
  initialState,
} from "./MedicalRecordCreateState";
import { MedicalRecordCreateReducer } from "./MedicalRecordCreateReducer";

export interface IMedicalRecordCreateContext {
  state: IMedicalRecordCreateState;
  actions: IMedicalRecordCreateActions;
  dispatch: Dispatch<any>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setActive: Dispatch<SetStateAction<number>>;
  active: number;
  popupActive: boolean;
  setPopupActive: Dispatch<SetStateAction<boolean>>;
  popupSectionActive: number;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const MedicalRecordCreateContext =
  createContext<IMedicalRecordCreateContext>({} as IMedicalRecordCreateContext);

const MedicalRecordCreateProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(
    MedicalRecordCreateReducer,
    initialState
  );

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [popupActive, setPopupActive] = useState(false);
  const [popupSectionActive, setPopupSectionActive] = useState(0);
  const [title, setTitle] = useState("Historial de consultas");

  return (
    <MedicalRecordCreateContext.Provider
      value={{
        state,
        actions,
        dispatch,
        isOpen,
        setIsOpen,
        setActive,
        active,
        popupActive,
        setPopupActive,
        popupSectionActive,
        setPopupSectionActive,
        title,
        setTitle,
      }}
    >
      {children}
    </MedicalRecordCreateContext.Provider>
  );
};

export default MedicalRecordCreateProvider;
