export const FormularyReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SIGN_IN_USER_SUCCESSFUL':
      return {
        ...state,
        signInUser: {
          ...state.signInUser,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'SIGN_IN_USER_LOADING':
      return {
        ...state,
        signInUser: {
          ...state.signInUser,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'SIGN_IN_USER_ERROR':
      return {
        ...state,
        signInUser: {
          ...state.signInUser,
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
