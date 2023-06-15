export const DashboardReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_PENDING_APPOINTMENTS_LOADING':
      return {
        ...state,
        getPendingAppointments: {
          ...state.getPendingAppointments,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_PENDING_APPOINTMENTS_SUCCESSFUL':
      return {
        ...state,
        getPendingAppointments: {
          ...state.getPendingAppointments,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_PENDING_APPOINTMENTS_ERROR':
      return {
        ...state,
        getPendingAppointments: {
          ...state.getPendingAppointments,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_COMPLETED_APPOINTMENTS_LOADING':
      return {
        ...state,
        getCompletedAppointments: {
          ...state.getCompletedAppointments,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_COMPLETED_APPOINTMENTS_SUCCESSFUL':
      return {
        ...state,
        getCompletedAppointments: {
          ...state.getCompletedAppointments,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_COMPLETED_APPOINTMENTS_ERROR':
      return {
        ...state,
        getCompletedAppointments: {
          ...state.getCompletedAppointments,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_LATEST_APPOINTMENT_LOADING':
      return {
        ...state,
        getLatestAppointment: {
          ...state.getLatestAppointment,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_LATEST_APPOINTMENT_SUCCESSFUL':
      return {
        ...state,
        getLatestAppointment: {
          ...state.getLatestAppointment,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_LATEST_APPOINTMENT_ERROR':
      return {
        ...state,
        getLatestAppointment: {
          ...state.getLatestAppointment,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_PATIENTS_LOADING':
      return {
        ...state,
        getSubjects: {
          ...state.getSubjects,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_PATIENTS_SUCCESSFUL':
      return {
        ...state,
        getSubjects: {
          ...state.getSubjects,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_PATIENTS_ERROR':
      return {
        ...state,
        getSubjects: {
          ...state.getSubjects,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    default:
      return state;
  }
};
