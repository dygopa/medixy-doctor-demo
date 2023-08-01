export const AutocompleteReducer = (state: any, action: any) => {
    switch (action.type) {  
      case 'GET_DATA_LOADING' :
        return {
          ...state,
          data: {
            ...state.data,
            data: [],
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_DATA_SUCCESSFUL' :
        return {
          ...state,
          data: {
            ...state.data,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_DATA_ERROR' :
        return {
          ...state,
          data: {
            ...state.data,
            data: [],
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
      }
  }