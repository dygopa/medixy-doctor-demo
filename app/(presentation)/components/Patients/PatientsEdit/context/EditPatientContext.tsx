import React, { Dispatch, useReducer, createContext } from "react";
import { IEditPatientActions, actions } from "./EditPatientActions";
import { IEditPatientState, initialState } from "./EditPatientState";
import { EditPatientReducer } from "./EditPatientReducer";

export interface IEditPatientContext {
    state: IEditPatientState;
    actions: IEditPatientActions;
    dispatch: Dispatch<any>;
}

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export const EditPatientContext = createContext<IEditPatientContext>(
    {} as IEditPatientContext
);

const EditPatientProvider = ({ children }: IProps) => {
    const [state, dispatch] = useReducer(EditPatientReducer, initialState);

    return (
        <EditPatientContext.Provider value={{ state, actions, dispatch }}>
            {children}
        </EditPatientContext.Provider>
    );
};

export default EditPatientProvider;