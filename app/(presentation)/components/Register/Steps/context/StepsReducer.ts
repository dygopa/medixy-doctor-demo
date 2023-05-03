export const StepsReducer = (state: any, action: any) => {
  switch (action.type) {
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
  