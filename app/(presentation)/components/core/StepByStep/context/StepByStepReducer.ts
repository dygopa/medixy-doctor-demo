export const StepByStepReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'GET_STEPS_SUCCESSFUL':
        return {
          ...state,
          getSteps: {
            ...state.getSteps,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_STEPS_LOADING':
        return {
          ...state,
          getSteps: {
            ...state.getSteps,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_STEPS_ERROR':
        return {
          ...state,
          getSteps: {
            ...state.getSteps,
            data: null,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        };
      case 'REGISTER_STEP_LOADING':
        return {
          ...state,
          createUserSteps: {
            ...state.createUserSteps,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'REGISTER_STEP_SUCCESSFUL':
        return {
          ...state,
          createUserSteps: {
            ...state.createUserSteps,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'REGISTER_STEP_ERROR':
        return {
          ...state,
          createUserSteps: {
            ...state.createUserSteps,
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
  