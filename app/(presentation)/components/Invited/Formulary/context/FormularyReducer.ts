export const FormularyReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHECK_OTP_SUCCESSFUL':
      return {
        ...state,
        checkOTP: {
          ...state.checkOTP,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHECK_OTP_LOADING':
      return {
        ...state,
        checkOTP: {
          ...state.checkOTP,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'CHECK_OTP_ERROR':
      return {
        ...state,
        checkOTP: {
          ...state.checkOTP,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'UDPATE_USER_OTP_SUCCESSFUL':
      return {
        ...state,
        updateUserOTP: {
          ...state.updateUserOTP,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'UDPATE_USER_OTP_LOADING':
      return {
        ...state,
        updateUserOTP: {
          ...state.updateUserOTP,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'UDPATE_USER_OTP_ERROR':
      return {
        ...state,
        updateUserOTP: {
          ...state.updateUserOTP,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'CHANGED_STEP':
      return {
        ...state,
        step: {
          ...state.step,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    default:
      return state;
  }
};
