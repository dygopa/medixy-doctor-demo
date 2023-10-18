import React, { createContext, Dispatch, useReducer } from "react";
import { actions, ISpecialistsActions } from "./SpecialistsActions";
import { SpecialistsReducer } from "./SpecialistsReducer";
import { ISpecialistsState, initialState } from "./SpecialistsState";

export interface ISpecialistsContext {
  state: ISpecialistsState;
  actions: ISpecialistsActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const SpecialistsContext = createContext<ISpecialistsContext>(
  {} as ISpecialistsContext
);

const SpecialistsProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(SpecialistsReducer, initialState);

  return (
    <SpecialistsContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </SpecialistsContext.Provider>
  );
};

export default SpecialistsProvider;
