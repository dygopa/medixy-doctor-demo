import React, { Dispatch, useReducer, createContext } from "react";
import { IDoctorViewActions, actions } from "./DoctorViewActions";
import { IDoctorViewState, initialState } from "./DoctorViewState";
import { DoctorViewReducer } from "./DoctorViewReducer";

export interface IDoctorViewContext {
    state: IDoctorViewState;
    actions: IDoctorViewActions;
    dispatch: Dispatch<any>;
}

interface IProps {
    children: JSX.Element | JSX.Element[];
}

export const DoctorViewContext = createContext<IDoctorViewContext>(
    {} as IDoctorViewContext
);

const DoctorViewProvider = ({ children }: IProps) => {
    const [state, dispatch] = useReducer(DoctorViewReducer, initialState);

    return (
        <DoctorViewContext.Provider value={{ state, actions, dispatch }}>
            {children}
        </DoctorViewContext.Provider>
    );
};

export default DoctorViewProvider;