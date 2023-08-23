export const AutocompleteInputServicesReducer = (state: any, action: any) => {
    switch (action.type) {  
      case 'GET_SERVICES_CATEGORIES_LOADING' :
        return {
          ...state,
          servicesCategories: {
            ...state.servicesCategories,
            data: [],
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_SERVICES_CATEGORIES_SUCCESSFUL' :
        return {
          ...state,
          servicesCategories: {
            ...state.servicesCategories,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_SERVICES_CATEGORIES_ERROR' :
        return {
          ...state,
          servicesCategories: {
            ...state.servicesCategories,
            data: [],
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
      }
  }