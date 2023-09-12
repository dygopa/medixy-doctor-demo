import { createContext, Dispatch, useReducer } from "react";
import { actions, ISignOutActions } from "./SignOutActions";
import { SignOutReducer } from "./SignOutReducer";
import { ISignOutState, initialState } from "./SignOutState";

export interface ISignOutContext {
  state: ISignOutState;
  actions: ISignOutActions;
  dispatch: Dispatch<any>;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const SignOutContext = createContext<ISignOutContext>(
  {} as ISignOutContext
);

const SignOutProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(SignOutReducer, initialState);

  return (
    <SignOutContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </SignOutContext.Provider>
  );
};

export default SignOutProvider;
