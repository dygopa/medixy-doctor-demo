export const RegisterReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_REGISTER_DATA':
      return {
        ...state,
        registerData: {
          ...state.registerData,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'REGISTER_USER_SUCCESSFUL':
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'REGISTER_USER_LOADING':
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'REGISTER_USER_ERROR':
      return {
        ...state,
        registerUser: {
          ...state.registerUser,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };

    default:
      return state;
  }
};
