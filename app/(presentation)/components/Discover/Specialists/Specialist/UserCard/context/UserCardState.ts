import { ILocality } from "@/lib/domain/core/entities/localityEntity";
import { Specialist } from "@/lib/domain/core/entities/specialists/specialist";
import { LocalityFailure } from "@/lib/domain/core/failures/locality/localityFailure";


export interface IUserCardState {
  editUser: IEditUserState;
  updateAvatar: IUpdateDataState;
  updateCompletedProfile: IUpdateCompletedProfileDataState;
}

interface IEditUserState {
  data: any;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

interface IUpdateDataState {
  data: any;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}

interface IUpdateCompletedProfileDataState {
  data: boolean;
  loading: boolean;
  successful: boolean;
  error: LocalityFailure | null; 
}


export const initialState: IUserCardState = {
  editUser: {
    data: null,
    loading: false,
    successful: false,
    error: null
  },
  updateAvatar: {
    data: null,
    loading: false,
    successful: false,
    error: null
  },
  updateCompletedProfile: {
    data: false,
    loading: false,
    successful: false,
    error: null
  },
}