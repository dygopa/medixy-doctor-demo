export const RegisterReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_REGISTER_DATA':
      return {
        ...state,
        registerData: {
          ...state.registerData,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'REGISTER_USER_SUCCESSFUL':
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'REGISTER_USER_LOADING':
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'REGISTER_USER_ERROR':
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'UPDATE_PASSWORD_SUCCESSFUL':
      return {
        ...state,
        updatePassword: {
          ...state.updatePassword,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'UPDATE_PASSWORD_LOADING':
      return {
        ...state,
        updatePassword: {
          ...state.updatePassword,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'UPDATE_PASSWORD_ERROR':
      return {
        ...state,
        updatePassword: {
          ...state.updatePassword,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_MEDICAL_SPECIALITIES_LOADING':
      return {
        ...state,
        medicalSpecialities: {
          ...state.medicalSpecialities,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_MEDICAL_SPECIALITIES_SUCCESSFUL':
      return {
        ...state,
        medicalSpecialities: {
          ...state.medicalSpecialities,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_MEDICAL_SPECIALITIES_ERROR':
      return {
        ...state,
        medicalSpecialities: {
          ...state.medicalSpecialities,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_USER_MEDICAL_SPECIALITIES_LOADING':
      return {
        ...state,
        getUserMedicalSpecialities: {
          ...state.getUserMedicalSpecialities,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_USER_MEDICAL_SPECIALITIES_SUCCESSFUL':
      return {
        ...state,
        getUserMedicalSpecialities: {
          ...state.getUserMedicalSpecialities,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_USER_MEDICAL_SPECIALITIES_ERROR':
      return {
        ...state,
        getUserMedicalSpecialities: {
          ...state.getUserMedicalSpecialities,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_FEDERAL_ENTITIES_LOADING' :
      return {
        ...state,
        getFederalEntities: {
          ...state.getFederalEntities,
          data: [],
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_FEDERAL_ENTITIES_SUCCESSFUL' :
      return {
        ...state,
        getFederalEntities: {
          ...state.getFederalEntities,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_FEDERAL_ENTITIES_ERROR' :
      return {
        ...state,
        getFederalEntities: {
          ...state.getFederalEntities,
          data: [],
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }
    case 'GET_MUNICIPALITIES_LOADING' :
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          data: {},
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_MUNICIPALITIES_SUCCESSFUL' :
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_MUNICIPALITIES_ERROR' :
      return {
        ...state,
        municipalities: {
          ...state.municipalities,
          data: {},
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }

    default:
      return state;
  }
};
