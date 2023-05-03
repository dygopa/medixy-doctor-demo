export const ScheduleReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_STATUS_POPUP':
      return {
        ...state,
        statusPopup: {
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'CHANGE_TYPE_ACTIVE_POPUP':
      return {
        ...state,
        typePopupActive: {
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case 'GET_USER_SCHEDULE_SUCCESSFUL':
      return {
        ...state,
        userSchedule: {
          ...state.userSchedule,
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
