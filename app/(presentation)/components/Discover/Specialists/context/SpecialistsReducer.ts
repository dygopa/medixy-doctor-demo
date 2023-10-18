export const SpecialistsReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_SPECIALIST_LOADING':
      return {
        ...state,
        getSpecialist: {
          ...state.getSpecialist,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_SPECIALIST_SUCCESSFUL':
      return {
        ...state,
        getSpecialist: {
          ...state.getSpecialist,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_SPECIALIST_ERROR':
      return {
        ...state,
        getSpecialist: {
          ...state.getSpecialist,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
      case 'GET_SPECIALIST_LOCALITIES_LOADING':
        return {
          ...state,
          getSpecialistLocalities: {
            ...state.getSpecialistLocalities,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_SPECIALIST_LOCALITIES_SUCCESSFUL':
        return {
          ...state,
          getSpecialistLocalities: {
            ...state.getSpecialistLocalities,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_SPECIALIST_LOCALITIES_ERROR':
        return {
          ...state,
          getSpecialistLocalities: {
            ...state.getSpecialistLocalities,
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
