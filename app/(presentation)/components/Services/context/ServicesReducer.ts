export const ServicesReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_CATEGORIES_SERVICES_LOADING':
      return {
        ...state,
        getCategories: {
          ...state.getCategories,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_CATEGORIES_SERVICES_SUCCESSFUL':
      return {
        ...state,
        getCategories: {
          ...state.getCategories,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_CATEGORIES_SERVICES_ERROR':
      return {
        ...state,
        getCategories: {
          ...state.getCategories,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'GET_MEDICAL_CENTERS_LOADING':
      return {
        ...state,
        getUserMedicalCenters: {
          ...state.getUserMedicalCenters,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_MEDICAL_CENTERS_SUCCESSFUL':
      return {
        ...state,
        getUserMedicalCenters: {
          ...state.getUserMedicalCenters,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_MEDICAL_CENTERS_ERROR':
      return {
        ...state,
        getUserMedicalCenters: {
          ...state.getUserMedicalCenters,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
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
    case 'GET_SERVICE_LOADING':
      return {
        ...state,
        getService: {
          ...state.getService,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_SERVICE_SUCCESSFUL':
      return {
        ...state,
        getService: {
          ...state.getService,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_SERVICE_ERROR':
      return {
        ...state,
        getService: {
          ...state.getService,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'CREATE_USER_SERVICE_LOADING':
      return {
        ...state,
        createUserService: {
          ...state.createUserService,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'CREATE_USER_SERVICE_SUCCESSFUL':
      return {
        ...state,
        createUserService: {
          ...state.createUserService,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CREATE_USER_SERVICE_ERROR':
      return {
        ...state,
        createUserService: {
          ...state.createUserService,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'UPDATE_USER_SERVICE_LOADING':
      return {
        ...state,
        updateService: {
          ...state.updateService,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'UPDATE_USER_SERVICE_SUCCESSFUL':
      return {
        ...state,
        updateService: {
          ...state.updateService,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'UPDATE_USER_SERVICE_ERROR':
      return {
        ...state,
        updateService: {
          ...state.updateService,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'DELETE_USER_SERVICE_LOADING':
      return {
        ...state,
        deleteService: {
          ...state.deleteService,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'DELETE_USER_SERVICE_SUCCESSFUL':
      return {
        ...state,
        deleteService: {
          ...state.deleteService,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'DELETE_USER_SERVICE_ERROR':
      return {
        ...state,
        deleteService: {
          ...state.deleteService,
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
