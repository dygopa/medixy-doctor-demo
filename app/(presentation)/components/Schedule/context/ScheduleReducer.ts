export const ScheduleReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_STATUS_POPUP':
      return {
        ...state,
        statusPopup: {
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHANGE_TYPE_ACTIVE_POPUP':
      return {
        ...state,
        typePopupActive: {
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_USER_SCHEDULE_SUCCESSFUL':
      return {
        ...state,
        userSchedule: {
          ...state.userSchedule,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_APPOINTMENTS_LOADING':
      return {
        ...state,
        getAppointments: {
          ...state.getAppointments,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_APPOINTMENTS_SUCCESSFUL':
      return {
        ...state,
        getAppointments: {
          ...state.getAppointments,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_APPOINTMENTS_ERROR':
      return {
        ...state,
        getAppointments: {
          ...state.getAppointments,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_ATTENTION_WINDOWS_LOADING':
      return {
        ...state,
        getAttentionWindows: {
          ...state.getAttentionWindows,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_ATTENTION_WINDOWS_SUCCESSFUL':
      return {
        ...state,
        getAttentionWindows: {
          ...state.getAttentionWindows,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_ATTENTION_WINDOWS_ERROR':
      return {
        ...state,
        getAttentionWindows: {
          ...state.getAttentionWindows,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'CREATE_APPOINTMENT_LOADING':
      return {
        ...state,
        createAppointment: {
          ...state.createAppointment,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'CREATE_APPOINTMENT_SUCCESSFUL':
      return {
        ...state,
        createAppointment: {
          ...state.createAppointment,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CREATE_APPOINTMENT_ERROR':
      return {
        ...state,
        createAppointment: {
          ...state.createAppointment,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_ATTENTION_WINDOWS_BY_SERVICE_LOADING':
      return {
        ...state,
        getAttentionWindowsByService: {
          ...state.getAttentionWindowsByService,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_ATTENTION_WINDOWS_BY_SERVICE_SUCCESSFUL':
      return {
        ...state,
        getAttentionWindowsByService: {
          ...state.getAttentionWindowsByService,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_ATTENTION_WINDOWS_BY_SERVICE_ERROR':
      return {
        ...state,
        getAttentionWindowsByService: {
          ...state.getAttentionWindowsByService,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'CREATE_WINDOW_ATTENTION_LOADING':
      return {
        ...state,
        createWindowAttention: {
          ...state.createWindowAttention,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'CREATE_WINDOW_ATTENTION_SUCCESSFUL':
      return {
        ...state,
        createWindowAttention: {
          ...state.createWindowAttention,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CREATE_WINDOW_ATTENTION_ERROR':
      return {
        ...state,
        createWindowAttention: {
          ...state.createWindowAttention,
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
