export const AutocompleteInputMunReducer = (state: any, action: any) => {
    switch (action.type) {  
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

      case 'GET_MUNICIPALITY_LOADING' :
        return {
          ...state,
          municipality: {
            ...state.municipality,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_MUNICIPALITY_SUCCESSFUL' :
        return {
          ...state,
          municipality: {
            ...state.municipality,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_MUNICIPALITY_ERROR' :
        return {
          ...state,
          municipality: {
            ...state.municipality,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
      }
  }