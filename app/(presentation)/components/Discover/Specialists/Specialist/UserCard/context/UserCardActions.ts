import SpecialistsUseCase from "domain/useCases/specialists/specialistsUseCase";
import { Dispatch } from "react";

export interface IUserCardActions {
  editUser: Function;
  updateAvatar: Function;
  updateProfileCompleted: Function;
}

const editUser = (user: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "EDIT_USER_LOADING" });
    
    const res:any = await new SpecialistsUseCase().editUser(user);

    dispatch({ type: "EDIT_USER_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "EDIT_USER_ERROR", payload: { error: error } });
  }
}

const updateAvatar = (obj:any, doctorId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_AVATAR_LOADING" });
    
    const res: string = await new SpecialistsUseCase().updateAvatar(obj, doctorId);

    dispatch({ type: "UPDATE_AVATAR_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "UPDATE_AVATAR_ERROR", payload: { error: error } });
  }
}

const updateProfileCompleted = (userId: number, doctorId: number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "UPDATE_PROFILE_COMPLETED_LOADING" });
    
    const res: boolean = await new SpecialistsUseCase().updateProfileCompleted(userId, doctorId);

    dispatch({ type: "UPDATE_PROFILE_COMPLETED_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "UPDATE_PROFILE_COMPLETED_ERROR", payload: { error: error } });
  }
}

export const actions: IUserCardActions = {
  editUser,
  updateAvatar,
  updateProfileCompleted
}
