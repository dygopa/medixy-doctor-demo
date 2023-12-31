export const PatientListReducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET_PATIENTS_LOADING" :
      return {
        ...state,
        getSubjects: {
          ...state.getSubjects,
          data: {},
          loading: true,
          successful: false,
          error: null,
        },
      };
    case "GET_PATIENTS_SUCCESSFUL" :
      return {
        ...state,
        getSubjects: {
          ...state.getSubjects,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      }
    case "GET_PATIENTS_ERROR" :
      return {
        ...state,
        getSubjects: {
          ...state.getSubjects,
          data: {},
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }
  }  
}