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
      }
  }