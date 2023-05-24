import React, { createContext, Dispatch, useReducer } from "react";
import { actions, ICreatePatientActions } from "./CreatePatientActions";
import { CreatePatientReducer } from "./CreatePatientReducer";
import { ICreatePatientState, initialState } from "./CreatePatientState";

export interface ICreatePatientContext {
    state: ICreatePatientState,
    actions: ICreatePatientActions,
    dispatch: Dispatch<any>;
}

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export const CreatePatientContext = createContext<ICreatePatientContext>(
  {} as ICreatePatientContext
);

const CreatePatientProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(CreatePatientReducer, initialState);

  return (
    <CreatePatientContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </CreatePatientContext.Provider>
  );
};

export default CreatePatientProvider;