export const DoctorViewReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_DOCTOR_LOADING' :
      return {
        ...state,
        getDoctorById: {
          ...state.getDoctorById,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_DOCTOR_SUCCESSFUL' :
      return {
        ...state,
        getDoctorById: {
          ...state.getDoctorById,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_DOCTOR_ERROR' :
      return {
        ...state,
        getDoctorById: {
          ...state.getDoctorById,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }

    case 'GET_USER_MEDICAL_SPECIALITIES_LOADING' :
      return {
        ...state,
        getUserMedicalSpecialities: {
          ...state.getUserMedicalSpecialities,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_USER_MEDICAL_SPECIALITIES_SUCCESSFUL' :
      return {
        ...state,
        getUserMedicalSpecialities: {
          ...state.getUserMedicalSpecialities,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_USER_MEDICAL_SPECIALITIES_ERROR' :
      return {
        ...state,
        getUserMedicalSpecialities: {
          ...state.getUserMedicalSpecialities,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      }

  }
}