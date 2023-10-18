import { Specialist } from "domain/core/entities/specialists/specialist";
import SpecialistsUseCase from "domain/useCases/specialists/specialistsUseCase";
import { Dispatch } from "react";

export interface ISpecialistsActions {
  getSpecialist: Function;
  getSpecialistLocalities: Function;
}

const getSpecialist = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SPECIALIST_LOADING" });
    
    const res: Specialist = await new SpecialistsUseCase().getSpecialist(id);

    dispatch({ type: "GET_SPECIALIST_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SPECIALIST_ERROR", payload: { error: error } });
  }
}

const getSpecialistLocalities = (id:number) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "GET_SPECIALIST_LOCALITIES_LOADING" });
    
    const res: any[] = await new SpecialistsUseCase().getSpecialistLocalities(id);

    dispatch({ type: "GET_SPECIALIST_LOCALITIES_SUCCESSFUL", payload: { data: res } });
  } catch (error) {
    console.log("Error calling action", error)
    dispatch({ type: "GET_SPECIALIST_LOCALITIES_ERROR", payload: { error: error } });
  }
}

export const actions: ISpecialistsActions = {
  getSpecialist,
  getSpecialistLocalities,
}
