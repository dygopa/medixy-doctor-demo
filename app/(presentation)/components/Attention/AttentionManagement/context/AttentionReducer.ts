export const AttentionReducer = (state: any, action: any) => {
    switch (action.type) {  
      case 'GET_SUBJECT_LOADING':
        return {
          ...state,
          subject: {
            ...state.subject,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_SUBJECT_SUCCESSFUL':
        return {
          ...state,
          subject: {
            ...state.subject,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_SUBJECT_ERROR':
        return {
          ...state,
          subject: {
            ...state.subject,
            data: null,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

      case 'GET_APPOINTMENT_LOADING':
        return {
          ...state,
          appointment: {
            ...state.appointment,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
          subject: {
            ...state.subject,
            data: null,
            loading: false,
            successful: false,
            error: null,
          },
        };
      case 'GET_APPOINTMENT_SUCCESSFUL':
        return {
          ...state,
          appointment: {
            ...state.appointment,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
          subject: {
            ...state.subject,
            data: action.payload.data.data.subject,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_APPOINTMENT_ERROR':
        return {
          ...state,
          appointment: {
            ...state.appointment,
            data: null,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
          subject: {
            ...state.subject,
            data: null,
            loading: false,
            successful: false,
            error: null,
          },
        }

        case "GET_ALLERGIES_LOADING" :
          return {
            ...state,
            allergies: {
              ...state.allergies,
              data: {},
              loading: true,
              successful: false,
              error: null,
            },
          };
        case "GET_ALLERGIES_SUCCESSFUL" :
          return {
            ...state,
            allergies: {
              ...state.allergies,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          }
        case "GET_ALLERGIES_ERROR" :
          return {
            ...state,
            allergies: {
              ...state.allergies,
              data: {},
              loading: false,
              successful: false,
              error: action.payload.error,
            },
          }

        case 'FINISHED_APPOINTMENT_LOADING':
          return {
            ...state,
            finishedAppointment: {
              ...state.finishedAppointment,
              data: null,
              loading: true,
              successful: false,
              error: null,
            },
          };
        case 'FINISHED_APPOINTMENT_SUCCESSFUL':
          return {
            ...state,
            finishedAppointment: {
              ...state.finishedAppointment,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          };
        case 'FINISHED_APPOINTMENT_ERROR':
          return {
            ...state,
            finishedAppointment: {
              ...state.finishedAppointment,
              data: null,
              loading: false,
              successful: false,
              error: action.payload.error,
            },
          }

          case 'CANCELED_APPOINTMENT_LOADING':
            return {
              ...state,
              canceledAppointment: {
                ...state.canceledAppointment,
                data: null,
                loading: true,
                successful: false,
                error: null,
              },
            };
          case 'CANCELED_APPOINTMENT_SUCCESSFUL':
            return {
              ...state,
              canceledAppointment: {
                ...state.canceledAppointment,
                data: action.payload.data,
                loading: false,
                successful: true,
                error: null,
              },
            };
          case 'CANCELED_APPOINTMENT_ERROR':
            return {
              ...state,
              canceledAppointment: {
                ...state.canceledAppointment,
                data: null,
                loading: false,
                successful: false,
                error: action.payload.error,
              },
            }
      }
  }