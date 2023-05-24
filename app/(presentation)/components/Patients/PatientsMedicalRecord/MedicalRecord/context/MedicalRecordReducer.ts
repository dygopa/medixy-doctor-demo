export const MedicalRecordReducer = (state: any, action: any) => {
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

      case "GET_MEDICAL_MEASURES_LOADING" :
        return {
          ...state,
          medicalMeasures: {
            ...state.medicalMeasures,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "GET_MEDICAL_MEASURES_SUCCESSFUL" :
        return {
          ...state,
          medicalMeasures: {
            ...state.medicalMeasures,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        }
      case "GET_MEDICAL_MEASURES_ERROR" :
        return {
          ...state,
          medicalMeasures: {
            ...state.medicalMeasures,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

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