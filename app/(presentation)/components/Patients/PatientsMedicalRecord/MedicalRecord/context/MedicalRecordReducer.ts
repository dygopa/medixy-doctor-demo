export const MedicalRecordReducer = (state: any, action: any) => {
    switch (action.type) {  
      case 'GET_PATIENT_LOADING' :
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
      case 'GET_PATIENT_SUCCESSFUL' :
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
      case 'GET_PATIENT_ERROR' :
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
      }
  }