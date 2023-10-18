export const UserCardReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'EDIT_USER_LOADING':
      return {
        ...state,
        editUser: {
          ...state.editUser,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'EDIT_USER_SUCCESSFUL':
      return {
        ...state,
        editUser: {
          ...state.editUser,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'EDIT_USER_ERROR':
      return {
        ...state,
        editUser: {
          ...state.editUser,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    case 'UPDATE_AVATAR_LOADING':
      return {
        ...state,
        updateAvatar: {
          ...state.updateAvatar,
          data: null,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'UPDATE_AVATAR_SUCCESSFUL':
      return {
        ...state,
        updateAvatar: {
          ...state.updateAvatar,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'UPDATE_AVATAR_ERROR':
      return {
        ...state,
        updateAvatar: {
          ...state.updateAvatar,
          data: null,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
      case 'UPDATE_PROFILE_COMPLETED_LOADING':
      return {
        ...state,
        updateCompletedProfile: {
          ...state.updateCompletedProfile,
          data: false,
          loading: true,
          successful: false,
          error: null,
        },
      };
    case 'UPDATE_PROFILE_COMPLETED_SUCCESSFUL':
      return {
        ...state,
        updateCompletedProfile: {
          ...state.updateCompletedProfile,
          data: true,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'UPDATE_PROFILE_COMPLETED_ERROR':
      return {
        ...state,
        updateCompletedProfile: {
          ...state.updateCompletedProfile,
          data: false,
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
    default:
      return state;
  }
};
