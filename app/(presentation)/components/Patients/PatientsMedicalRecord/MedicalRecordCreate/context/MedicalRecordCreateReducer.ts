export const MedicalRecordCreateReducer = (state: any, action: any) => {
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

      case 'GET_CIE10_LOADING' :
        return {
          ...state,
          cie10: {
            ...state.cie10,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_CIE10_SUCCESSFUL' :
        return {
          ...state,
          cie10: {
            ...state.cie10,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_CIE10_ERROR' :
        return {
          ...state,
          cie10: {
            ...state.cie10,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
      }
  }