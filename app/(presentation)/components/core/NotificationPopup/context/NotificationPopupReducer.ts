export const NotificationsPopupReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'GET_NOTIFICATIONS_SUCCESSFUL':
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    data: action.payload.data,
                    loading: false,
                    successful: true,
                    error: null,
                },
            };
        case 'GET_NOTIFICATIONS_LOADING':
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    data: null,
                    loading: true,
                    successful: false,
                    error: null,
                },
            };
        case 'GET_NOTIFICATIONS_ERROR':
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    data: null,
                    loading: false,
                    successful: false,
                    error: action.payload.error,
                },
            };
            case 'UPDATE_USER_FCM_TOKEN_LOADING':
                return {
                  ...state,
                  userFCMToken: {
                    ...state.userFCMToken,
                    data: null,
                    loading: true,
                    successful: false,
                    error: null,
                  },
                };
              case 'UPDATE_USER_FCM_TOKEN_SUCCESSFUL':
                return {
                  ...state,
                  userFCMToken: {
                    ...state.userFCMToken,
                    data: action.payload.data,
                    loading: false,
                    successful: true,
                    error: null,
                  },
                };
              case 'UPDATE_USER_FCM_TOKEN_ERROR':
                return {
                  ...state,
                  userFCMToken: {
                    ...state.userFCMToken,
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
