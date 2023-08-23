export const AutocompleteInputSpecialtiesReducer = (state: any, action: any) => {
    switch (action.type) {  
      case 'GET_SPECIALTIES_LOADING' :
        return {
          ...state,
          specialties: {
            ...state.specialties,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_SPECIALTIES_SUCCESSFUL' :
        return {
          ...state,
          specialties: {
            ...state.specialties,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_SPECIALTIES_ERROR' :
        return {
          ...state,
          specialties: {
            ...state.specialties,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

      case 'GET_SPECIALTY_LOADING' :
        return {
          ...state,
          specialty: {
            ...state.specialty,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_SPECIALTY_SUCCESSFUL' :
        return {
          ...state,
          specialty: {
            ...state.specialty,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_SPECIALTY_ERROR' :
        return {
          ...state,
          specialty: {
            ...state.specialty,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
      }
  }