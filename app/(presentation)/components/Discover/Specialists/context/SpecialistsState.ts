import { Specialist } from "domain/core/entities/specialists/specialist";
import { LocalityFailure } from "domain/core/failures/locality/localityFailure";

export interface ISpecialistsState {
  getSpecialist: ISpecialistsSpecialistsState;
  getSpecialistLocalities: ISpecialistsSpecialistsState;
}

interface ISpecialistsSpecialistsState {
  data: any;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

export const initialState: ISpecialistsState = {
  getSpecialist: {
    data: {} as Specialist,
    loading: false,
    successful: false,
    error: null,
  },
  getSpecialistLocalities: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
}