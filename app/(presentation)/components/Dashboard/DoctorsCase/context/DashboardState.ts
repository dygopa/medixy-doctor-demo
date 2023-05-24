import { DashboardFailure } from "domain/core/failures/dashboard/DashboardFailure";

export interface IDashboardState {
  getPendingAppointments: IState;
  getCompletedAppointments: IState;
  getLatestAppointment: IState;
  getPatients: IState;
}

interface IState {
  data: string | null | Object | Array<any>;
  loading: boolean;
  successful: boolean;
  error: DashboardFailure | null; 
}

export const initialState: IDashboardState = {
  getPendingAppointments: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getCompletedAppointments: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
  getLatestAppointment: {
    data: {},
    loading: false,
    successful: false,
    error: null,
  },
  getPatients: {
    data: [],
    loading: false,
    successful: false,
    error: null,
  },
}