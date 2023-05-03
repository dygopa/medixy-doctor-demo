import RegisterUseCase from "domain/useCases/register/registerUseCase";
import { Dispatch } from "react";

export interface IRegisterActions {
  registerUser: Function;
  searchCURP: Function;
  updateRegisterData: Function;
}

const registerUser = (obj:any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "REGISTER_USER_LOADING" });

    const res:string = await new RegisterUseCase().registerUser(obj);

    dispatch({ type: "REGISTER_USER_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "REGISTER_USER_ERROR", payload: { error: error } });
  }
}

const searchCURP = (obj:{curp: string}) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "CURP_LOADING" });

    const res:string = ""

    dispatch({ type: "CURP_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    dispatch({ type: "CURP_ERROR", payload: { error: error } });
  }
}

const updateRegisterData = (obj:Object) => async (dispatch: Dispatch<any>) => dispatch({ type: "UPDATE_REGISTER_DATA", payload: { data: obj } });

export const actions: IRegisterActions = {
  registerUser,
  searchCURP,
  updateRegisterData
}
