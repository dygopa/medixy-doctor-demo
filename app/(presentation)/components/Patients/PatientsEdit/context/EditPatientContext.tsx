import React, { Dispatch, useReducer, createContext } from "react";
import { IEditSubjectActions, actions } from "./EditPatientActions";
import { IEditSubjectState, initialState } from "./EditPatientState";
import { EditSubjectReducer } from "./EditPatientReducer";

export interface IEditPatientContext {
    state: IEditSubjectState;
    actions: IEditSubjectActions;
    dispatch: Dispatch<any>;
}

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export const EditPatientContext = createContext<IEditPatientContext>(
    {} as IEditPatientContext
);

const EditPatientProvider = ({ children }: IProps) => {
    const [state, dispatch] = useReducer(EditSubjectReducer, initialState);

    return (
        <EditPatientContext.Provider value={{ state, actions, dispatch }}>
            {children}
        </EditPatientContext.Provider>
    );
};

export default EditPatientProvider;