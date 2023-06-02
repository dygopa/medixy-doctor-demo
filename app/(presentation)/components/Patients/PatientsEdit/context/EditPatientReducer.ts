export const EditPatientReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_PATIENT_LOADING' :
      return {
        ...state,
        patient: {
          ...state.patient,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_PATIENT_SUCCESSFUL' :
      return {
        ...state,
        patient: {
          ...state.patient,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_PATIENT_ERROR' :
      return {
        ...state,
        patient: {
          ...state.patient,
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
        editPatient: {
          ...state.editPatient,
          data: false,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'EDIT_PATIENT_SUCCESSFUL' :
      return {
        ...state,
        editPatient: {
          ...state.editPatient,
          data: true,
          loading: false,
          successful: true,
          error: null,
        },
      }
    case 'EDIT_PATIENT_ERROR' :
      return {
        ...state,
        editPatient: {
          ...state.editPatient,
          data: false,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }
    }
}