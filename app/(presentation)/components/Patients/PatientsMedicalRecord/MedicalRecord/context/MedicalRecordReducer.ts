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

        case "GET_TREATMENTS_LOADING" :
          return {
            ...state,
            treatments: {
              ...state.treatments,
              data: {},
              loading: true,
              successful: false,
              error: null,
            },
          };
        case "GET_TREATMENTS_SUCCESSFUL" :
          return {
            ...state,
            treatments: {
              ...state.treatments,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          }
        case "GET_TREATMENTS_ERROR" :
          return {
            ...state,
            treatments: {
              ...state.treatments,
              data: {},
              loading: false,
              successful: false,
              error: action.payload.error,
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

        case "GET_MEDICAL_RECORDS_LOADING" :
          return {
            ...state,
            medicalRecords: {
              ...state.medicalRecords,
              data: {},
              loading: true,
              successful: false,
              error: null,
            },
          };
        case "GET_MEDICAL_RECORDS_SUCCESSFUL" :
          return {
            ...state,
            medicalRecords: {
              ...state.medicalRecords,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          }
        case "GET_MEDICAL_RECORDS_ERROR" :
          return {
            ...state,
            medicalRecords: {
              ...state.medicalRecords,
              data: {},
              loading: false,
              successful: false,
              error: action.payload.error,
            },
          }
      }
  }