export const RecoveryPasswordReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_DOCTOR_OTP_CODE_SUCCESSFUL':
        return {
          ...state,
          getDoctorOTPCode: {
            ...state.getDoctorOTPCode,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_DOCTOR_OTP_CODE_LOADING':
        return {
          ...state,
          getDoctorOTPCode: {
            ...state.getDoctorOTPCode,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_DOCTOR_OTP_CODE_ERROR':
        return {
          ...state,
          getDoctorOTPCode: {
            ...state.getDoctorOTPCode,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        };
      case 'SEND_DOCTOR_OTP_CODE_LOADING':
        return {
          ...state,
          sendDoctorOTPCode: {
            ...state.sendDoctorOTPCode,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'SEND_DOCTOR_OTP_CODE_SUCCESSFUL':
        return {
          ...state,
          sendDoctorOTPCode: {
            ...state.sendDoctorOTPCode,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'SEND_DOCTOR_OTP_CODE_ERROR':
        return {
          ...state,
          sendDoctorOTPCode: {
            ...state.sendDoctorOTPCode,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        };
      case 'UPDATE_PASSWORD_LOADING':
        return {
          ...state,
          updatePassword: {
            ...state.updatePassword,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'UPDATE_PASSWORD_SUCCESSFUL':
        return {
          ...state,
          updatePassword: {
            ...state.updatePassword,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'UPDATE_PASSWORD_ERROR':
        return {
          ...state,
          updatePassword: {
            ...state.updatePassword,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        };
  
      default:
        return state;
    }
  };
  