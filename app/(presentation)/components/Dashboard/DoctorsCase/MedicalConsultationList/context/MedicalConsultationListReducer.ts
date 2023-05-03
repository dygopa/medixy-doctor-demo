export const MedicalConsultationListReducer = (state: any, action: any) => {
    switch (action.type) {       
      case 'GET_MEDICAL_CONSULTATIONS_SUCESSFUL':
        return {
          ...state,
          consultations: {
            ...state.consultations,
            data: action.payload.data,
            loading: false,
            sucessful: true,
            error: null,
          },
        };
      case 'GET_MEDICAL_CONSULTATIONS_LOADING':
        return {
          ...state,
          consultations: {
            ...state.consultations,
            data: [],
            loading: true,
            sucessful: false,
            error: null,
          },
        };
      case 'GET_MEDICAL_CONSULTATIONS_ERROR':
        return {
          ...state,
          consultations: {
            ...state.consultations,
            data: [],
            loading: false,
            sucessful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  