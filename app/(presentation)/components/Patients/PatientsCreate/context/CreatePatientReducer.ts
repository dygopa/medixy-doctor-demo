export const CreatePatientReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CREATE_PATIENT_LOADING' :
      return {
        ...state,
        createSubject: {
          ...state.createSubject,
          data: false,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'CREATE_PATIENT_SUCCESSFUL' :
      return {
        ...state,
        createSubject: {
          ...state.createSubject,
          data: true,
          loading: false,
          successful: true,
          error: null,
        },
      }
    case 'CREATE_PATIENT_ERROR' :
      return {
        ...state,
        createSubject: {
          ...state.createSubject,
          data: false,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }
  } 
}