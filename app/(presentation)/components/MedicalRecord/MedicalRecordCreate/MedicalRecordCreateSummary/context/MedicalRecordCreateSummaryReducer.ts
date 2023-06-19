export const MedicalRecordCreateSummaryReducer = (state: any, action: any) => {
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

        case 'CREATE_MEDICAL_CONSULTY_LOADING' :
          return {
            ...state,
            createMedicalConsulty: {
              ...state.createMedicalConsulty,
              data: {},
              loading: true,
              successful: false,
              error: null,
            },
          };
        case 'CREATE_MEDICAL_CONSULTY_SUCCESSFUL' :
          return {
            ...state,
            createMedicalConsulty: {
              ...state.createMedicalConsulty,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          }
        case 'CREATE_MEDICAL_CONSULTY_ERROR' :
          return {
            ...state,
            createMedicalConsulty: {
              ...state.createMedicalConsulty,
              data: {},
              loading: false,
              successful: false,
              error: action.payload.error,
            },
          }
      }
  }