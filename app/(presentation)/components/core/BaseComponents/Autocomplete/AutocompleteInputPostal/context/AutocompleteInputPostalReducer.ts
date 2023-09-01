export const AutocompleteInputPostalReducer = (state: any, action: any) => {
    switch (action.type) {  
      case 'GET_POSTAL_CODES_LOADING' :
        return {
          ...state,
          postalCodes: {
            ...state.postalCodes,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_POSTAL_CODES_SUCCESSFUL' :
        return {
          ...state,
          postalCodes: {
            ...state.postalCodes,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_POSTAL_CODES_ERROR' :
        return {
          ...state,
          postalCodes: {
            ...state.postalCodes,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
        case 'GET_POSTAL_CODE_LOADING' :
          return {
            ...state,
            postalCode: {
              ...state.postalCode,
              data: {},
              loading: true,
              successful: false,
              error: null,
            },
          };
        case 'GET_POSTAL_CODE_SUCCESSFUL' :
          return {
            ...state,
            postalCode: {
              ...state.postalCode,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          };
        case 'GET_POSTAL_CODE_ERROR' :
          return {
            ...state,
            postalCode: {
              ...state.postalCode,
              data: {},
              loading: false,
              successful: false,
              error: action.payload.error,
            },
          }
      }
  }