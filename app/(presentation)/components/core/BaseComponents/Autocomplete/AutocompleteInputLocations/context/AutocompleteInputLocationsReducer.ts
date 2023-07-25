export const AutocompleteInputLocationsReducer = (state: any, action: any) => {
    switch (action.type) {  
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

      case 'GET_COUNTRY_LOCATION_LOADING' :
        return {
          ...state,
          countryLocation: {
            ...state.countryLocation,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_COUNTRY_LOCATION_SUCCESSFUL' :
        return {
          ...state,
          countryLocation: {
            ...state.countryLocation,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_COUNTRY_LOCATION_ERROR' :
        return {
          ...state,
          countryLocation: {
            ...state.countryLocation,
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