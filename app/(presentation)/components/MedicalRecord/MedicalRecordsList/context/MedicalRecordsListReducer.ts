export const MedicalRecordsListReducer = (state: any, action: any) => {
    switch (action.type) {
      case "GET_MEDICAL_CONSULTIES_LOADING" :
        return {
          ...state,
          medicalConsulties: {
            ...state.medicalConsulties,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "GET_MEDICAL_CONSULTIES_SUCCESSFUL" :
        return {
          ...state,
          medicalConsulties: {
            ...state.medicalConsulties,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        }
      case "GET_MEDICAL_CONSULTIES_ERROR" :
        return {
          ...state,
          medicalConsulties: {
            ...state.medicalConsulties,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
    }  
  }