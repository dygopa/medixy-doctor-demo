export const AutocompleteInputMedicalProfilesReducer = (state: any, action: any) => {
    switch (action.type) {  
      case 'GET_MEDICAL_PROFILES_LOADING' :
        return {
          ...state,
          medicalProfiles: {
            ...state.medicalProfiles,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_MEDICAL_PROFILES_SUCCESSFUL' :
        return {
          ...state,
          medicalProfiles: {
            ...state.medicalProfiles,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_MEDICAL_PROFILES_ERROR' :
        return {
          ...state,
          medicalProfiles: {
            ...state.medicalProfiles,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
      }
  }