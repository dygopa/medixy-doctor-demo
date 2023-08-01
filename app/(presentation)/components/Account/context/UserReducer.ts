export const UserReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_USER_LOADING':
      return {
        ...state,
        updateUserData: {
          ...state.updateUserData,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'UPDATE_USER_SUCCESSFUL':
      return {
        ...state,
        updateUserData: {
          ...state.updateUserData,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'UPDATE_USER_ERROR':
      return {
        ...state,
        updateUserData: {
          ...state.updateUserData,
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
    case 'CREATE_MEDICAL_SPECIALITY_LOADING':
      return {
        ...state,
        createMedicalSpeciality: {
          ...state.createMedicalSpeciality,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'CREATE_MEDICAL_SPECIALITY_SUCCESSFUL':
      return {
        ...state,
        createMedicalSpeciality: {
          ...state.createMedicalSpeciality,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CREATE_MEDICAL_SPECIALITY_ERROR':
      return {
        ...state,
        createMedicalSpeciality: {
          ...state.createMedicalSpeciality,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'UPDATE_MEDICAL_SPECIALITY_LOADING':
      return {
        ...state,
        updateMedicalSpeciality: {
          ...state.updateMedicalSpeciality,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'UPDATE_MEDICAL_SPECIALITY_SUCCESSFUL':
      return {
        ...state,
        updateMedicalSpeciality: {
          ...state.updateMedicalSpeciality,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'UPDATE_MEDICAL_SPECIALITY_ERROR':
      return {
        ...state,
        updateMedicalSpeciality: {
          ...state.updateMedicalSpeciality,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'DELETE_MEDICAL_SPECIALITY_LOADING':
      return {
        ...state,
        deleteMedicalSpeciality: {
          ...state.deleteMedicalSpeciality,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'DELETE_MEDICAL_SPECIALITY_SUCCESSFUL':
      return {
        ...state,
        deleteMedicalSpeciality: {
          ...state.deleteMedicalSpeciality,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'DELETE_MEDICAL_SPECIALITY_ERROR':
      return {
        ...state,
        deleteMedicalSpeciality: {
          ...state.deleteMedicalSpeciality,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
      case 'GET_COUNTRIES_LOADING' :
        return {
          ...state,
          getCountriesISO: {
            ...state.getCountriesISO,
            data: [],
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_COUNTRIES_SUCCESSFUL' :
        return {
          ...state,
          getCountriesISO: {
            ...state.getCountriesISO,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_COUNTRIES_ERROR' :
        return {
          ...state,
          getCountriesISO: {
            ...state.getCountriesISO,
            data: [],
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        };
        case 'UPDATE_AVATAR_LOADING':
      return {
        ...state,
        updateAvatar: {
          ...state.updateAvatar,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'UPDATE_AVATAR_SUCCESSFUL':
      return {
        ...state,
        updateAvatar: {
          ...state.updateAvatar,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'UPDATE_AVATAR_ERROR':
      return {
        ...state,
        updateAvatar: {
          ...state.updateAvatar,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };

    default:
      return state;
  }
};
