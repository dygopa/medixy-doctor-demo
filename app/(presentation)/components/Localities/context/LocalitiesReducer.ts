export const LocalitiesReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_MEDICAL_CENTERS_LOADING':
      return {
        ...state,
        getMedicalCenters: {
          ...state.getMedicalCenters,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_MEDICAL_CENTERS_SUCCESSFUL':
      return {
        ...state,
        getMedicalCenters: {
          ...state.getMedicalCenters,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_MEDICAL_CENTERS_ERROR':
      return {
        ...state,
        getMedicalCenters: {
          ...state.getMedicalCenters,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_COUNTRY_STATES_LOADING':
      return {
        ...state,
        getCountryStates: {
          ...state.getCountryStates,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_COUNTRY_STATES_SUCCESSFUL':
      return {
        ...state,
        getCountryStates: {
          ...state.getCountryStates,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_COUNTRY_STATES_ERROR':
      return {
        ...state,
        getCountryStates: {
          ...state.getCountryStates,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_USER_LOCALITIES_LOADING':
      return {
        ...state,
        getUserLocalities: {
          ...state.getUserLocalities,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_USER_LOCALITIES_SUCCESSFUL':
      return {
        ...state,
        getUserLocalities: {
          ...state.getUserLocalities,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_USER_LOCALITIES_ERROR':
      return {
        ...state,
        getUserLocalities: {
          ...state.getUserLocalities,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'CREATE_USER_LOCALITY_LOADING':
      return {
        ...state,
        createUserLocality: {
          ...state.createUserLocality,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'CREATE_USER_LOCALITY_SUCCESSFUL':
      return {
        ...state,
        createUserLocality: {
          ...state.createUserLocality,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CREATE_USER_LOCALITY_ERROR':
      return {
        ...state,
        createUserLocality: {
          ...state.createUserLocality,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'UPDATE_USER_LOCALITY_LOADING':
      return {
        ...state,
        updateUserLocality: {
          ...state.updateUserLocality,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'UPDATE_USER_LOCALITY_SUCCESSFUL':
      return {
        ...state,
        updateUserLocality: {
          ...state.updateUserLocality,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'UPDATE_USER_LOCALITY_ERROR':
      return {
        ...state,
        updateUserLocality: {
          ...state.updateUserLocality,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GETTING_USER_LOCALITY_LOADING':
      return {
        ...state,
        gettingUserLocality: {
          ...state.gettingUserLocality,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GETTING_USER_LOCALITY_SUCCESSFUL':
      return {
        ...state,
        gettingUserLocality: {
          ...state.gettingUserLocality,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GETTING_USER_LOCALITY_ERROR':
      return {
        ...state,
        gettingUserLocality: {
          ...state.gettingUserLocality,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'UPDATE_LOCALITY_DATA':
      return {
        ...state,
        localityData: {
          ...state.localityData,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
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
      case 'GET_COUNTRY_LOCATIONS_LOADING' :
        return {
          ...state,
          countryLocations: {
            ...state.countryLocations,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_COUNTRY_LOCATIONS_SUCCESSFUL' :
        return {
          ...state,
          countryLocations: {
            ...state.countryLocations,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_COUNTRY_LOCATIONS_ERROR' :
        return {
          ...state,
          countryLocations: {
            ...state.countryLocations,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
      case 'GET_USER_SERVICES_LOADING':
        return {
          ...state,
          getUserServices: {
            ...state.getUserServices,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_USER_SERVICES_SUCCESSFUL':
        return {
          ...state,
          getUserServices: {
            ...state.getUserServices,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_USER_SERVICES_ERROR':
        return {
          ...state,
          getUserServices: {
            ...state.getUserServices,
            data: null,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        };
        case 'GET_USER_BASE_SERVICES_LOADING':
          return {
            ...state,
            getUserBaseServices: {
              ...state.getUserBaseServices,
              data: null,
              loading: true,
              successful: false,
              error: null,
            },
          };
        case 'GET_USER_BASE_SERVICES_SUCCESSFUL':
          return {
            ...state,
            getUserBaseServices: {
              ...state.getUserBaseServices,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          };
        case 'GET_USER_BASE_SERVICES_ERROR':
          return {
            ...state,
            getUserBaseServices: {
              ...state.getUserBaseServices,
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