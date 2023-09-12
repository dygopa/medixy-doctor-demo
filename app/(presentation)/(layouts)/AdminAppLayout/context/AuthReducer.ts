export const AuthReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'GET_USER_AUTHENTICATED_LOADING':
      return {
        ...state,
        getUserAuthenticated: {
          ...state.getUserAuthenticated,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'GET_USER_AUTHENTICATED_SUCCESSFUL':
      return {
        ...state,
        getUserAuthenticated: {
          ...state.getUserAuthenticated,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_USER_AUTHENTICATED_ERROR':
      return {
        ...state,
        getUserAuthenticated: {
          ...state.getUserAuthenticated,
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
