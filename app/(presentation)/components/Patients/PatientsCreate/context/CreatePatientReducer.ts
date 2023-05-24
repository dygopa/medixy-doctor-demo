export const CreatePatientReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CREATE_PATIENT_LOADING' :
      return {
        ...state,
        createPatient: {
          ...state.createPatient,
          data: false,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'CREATE_PATIENT_SUCCESSFUL' :
      return {
        ...state,
        createPatient: {
          ...state.createPatient,
          data: true,
          loading: false,
          successful: true,
          error: null,
        },
      }
    case 'CREATE_PATIENT_ERROR' :
      return {
        ...state,
        createPatient: {
          ...state.createPatient,
          data: false,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }
  } 
}