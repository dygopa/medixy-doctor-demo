export const MedicalRecordCreateSummaryReducer = (state: any, action: any) => {
    switch (action.type) {  
      case 'GET_PATIENT_LOADING':
        return {
          ...state,
          patient: {
            ...state.patient,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_PATIENT_SUCCESSFUL':
        return {
          ...state,
          patient: {
            ...state.patient,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_PATIENT_ERROR':
        return {
          ...state,
          patient: {
            ...state.patient,
            data: null,
            loading: false,
            successful: false,
            error: action.payload.error,
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
              data: action.payload.adata,
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