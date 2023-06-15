import { createContext, Dispatch, useReducer } from "react";
import { actions, ICompanionsListActions } from "./companionListActions";
import { CompanionsListReducer } from "./companionListReducer";
import { ICompanionsListState, initialState } from "./companionListState";

export interface ICompanionsListContext {
  state: ICompanionsListState;
  actions: ICompanionsListActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const CompanionsListContext = createContext<ICompanionsListContext> (
  {} as ICompanionsListContext
);

const CompanionsListProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(CompanionsListReducer, initialState);

  return (
    <CompanionsListContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </CompanionsListContext.Provider>
  );
}

export default CompanionsListProvider;