export const EditSubjectReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_PATIENT_LOADING' :
      return {
        ...state,
        subject: {
          ...state.subject,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_PATIENT_SUCCESSFUL' :
      return {
        ...state,
        subject: {
          ...state.subject,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_PATIENT_ERROR' :
      return {
        ...state,
        subject: {
          ...state.subject,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }

    case 'GET_FEDERAL_ENTITIES_LOADING' :
      return {
        ...state,
        getFederalEntities: {
          ...state.getFederalEntities,
          data: [],
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_FEDERAL_ENTITIES_SUCCESSFUL' :
      return {
        ...state,
        getFederalEntities: {
          ...state.getFederalEntities,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_FEDERAL_ENTITIES_ERROR' :
      return {
        ...state,
        getFederalEntities: {
          ...state.getFederalEntities,
          data: [],
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }

    case 'EDIT_PATIENT_LOADING' :
      return {
        ...state,
        editSubject: {
          ...state.editSubject,
          data: false,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'EDIT_PATIENT_SUCCESSFUL' :
      return {
        ...state,
        editSubject: {
          ...state.editSubject,
          data: true,
          loading: false,
          successful: true,
          error: null,
        },
      }
    case 'EDIT_PATIENT_ERROR' :
      return {
        ...state,
        editSubject: {
          ...state.editSubject,
          data: false,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }
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