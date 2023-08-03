export const ScheduleReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_CALENDAR_EVENTS_LOADING':
      return {
        ...state,
        getCalendarEvents: {
          ...state.getCalendarEvents,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_CALENDAR_EVENTS_SUCCESSFUL':
      return {
        ...state,
        getCalendarEvents: {
          ...state.getCalendarEvents,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_CALENDAR_EVENTS_ERROR':
      return {
        ...state,
        getCalendarEvents: {
          ...state.getCalendarEvents,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'CHANGE_PREDIFINED_RESERVATION':
      return {
        ...state,
        predifinedReservationData: {
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHANGE_TYPE_OF_APPOINTMENT_CREATION':
      return {
        ...state,
        typeOfAppointmentCreation: {
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHANGE_APPOINTMENT_DETAIL':
      return {
        ...state,
        appointmentDetail: {
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHANGE_ACTIVE_LOCALITY':
      return {
        ...state,
        activeLocality: {
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHANGE_ACTIVE_SERVICE':
      return {
        ...state,
        activeService: {
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHANGE_ACTIVE_DAY':
      return {
        ...state,
        activeDay: {
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
      case 'CHANGE_ACTUAL_DAY':
        return {
          ...state,
          actualDay: {
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
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
    case 'GET_SERVICES_LOADING':
      return {
        ...state,
        getServices: {
          ...state.getServices,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_SERVICES_SUCCESSFUL':
      return {
        ...state,
        getServices: {
          ...state.getServices,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_SERVICES_ERROR':
      return {
        ...state,
        getServices: {
          ...state.getServices,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_SERVICES_LOADING':
      return {
        ...state,
        getServices: {
          ...state.getServices,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_SERVICES_SUCCESSFUL':
      return {
        ...state,
        getServices: {
          ...state.getServices,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_SERVICES_ERROR':
      return {
        ...state,
        getServices: {
          ...state.getServices,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_SERVICES_BY_LOCALITIES_LOADING':
      return {
        ...state,
        getServicesByLocality: {
          ...state.getServicesByLocality,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_SERVICES_BY_LOCALITIES_SUCCESSFUL':
      return {
        ...state,
        getServicesByLocality: {
          ...state.getServicesByLocality,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_SERVICES_BY_LOCALITIES_ERROR':
      return {
        ...state,
        getServicesByLocality: {
          ...state.getServicesByLocality,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_LOCALITIES_LOADING':
      return {
        ...state,
        getLocalities: {
          ...state.getLocalities,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_LOCALITIES_SUCCESSFUL':
      return {
        ...state,
        getLocalities: {
          ...state.getLocalities,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_LOCALITIES_ERROR':
      return {
        ...state,
        getLocalities: {
          ...state.getLocalities,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_LOCALITIES_WITH_SERVICES_LOADING':
      return {
        ...state,
        getLocalitiesWithServices: {
          ...state.getLocalitiesWithServices,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_LOCALITIES_WITH_SERVICES_SUCCESSFUL':
      return {
        ...state,
        getLocalitiesWithServices: {
          ...state.getLocalitiesWithServices,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_LOCALITIES_WITH_SERVICES_ERROR':
      return {
        ...state,
        getLocalitiesWithServices: {
          ...state.getLocalitiesWithServices,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_PATIENTS_LOADING':
      return {
        ...state,
        getPatients: {
          ...state.getPatients,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_PATIENTS_SUCCESSFUL':
      return {
        ...state,
        getPatients: {
          ...state.getPatients,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_PATIENTS_ERROR':
      return {
        ...state,
        getPatients: {
          ...state.getPatients,
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
