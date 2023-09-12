export const SignOutReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SIGN_OUT_USER_SUCCESSFUL':
        return {
          ...state,
          signOutUserState: {
            ...state.signOutUserState,
            data: action.payload.data,
            loading: false,
            successful: action.payload.successful,
            error: null,
          },
        };
      case 'SIGN_OUT_USER_LOADING':
        return {
          ...state,
          signOutUserState: {
            ...state.signOutUserState,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'SIGN_OUT_USER_ERROR':
        return {
          ...state,
          signOutUserState: {
            ...state.signOutUserState,
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
  