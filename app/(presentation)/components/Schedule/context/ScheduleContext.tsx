import React, { createContext, Dispatch, useReducer } from "react";
import { actions, IScheduleActions } from "./ScheduleActions";
import { ScheduleReducer } from "./ScheduleReducer";
import { IScheduleState, initialState } from "./ScheduleState";

export interface IScheduleContext {
  state: IScheduleState;
  actions: IScheduleActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const ScheduleContext = createContext<IScheduleContext>(
  {} as IScheduleContext
);

const ScheduleProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(ScheduleReducer, initialState);

  return (
    <ScheduleContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleProvider;
