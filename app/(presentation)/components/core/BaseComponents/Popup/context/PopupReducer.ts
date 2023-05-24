export const PopupReducer = (state: any, action: any) => {
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
    case 'CHANGE_CHILDREN_POPUP':
      return {
        ...state,
        changeChildrenPopup: {
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
