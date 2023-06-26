export const PatientListReducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET_DOCTORS_LOADING" :
      return {
        ...state,
        getDoctors: {
          ...state.getDoctors,
          data: {},
          loading: true,
          successful: false,
          error: null,
        },
      };
    case "GET_DOCTORS_SUCCESSFUL" :
      return {
        ...state,
        getDoctors: {
          ...state.getDoctors,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      }
    case "GET_DOCTORS_ERROR" :
      return {
        ...state,
        getDoctors: {
          ...state.getDoctors,
          data: {},
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }
  }  
}