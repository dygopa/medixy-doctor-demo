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
      case 'GET_STEPS_MESSAGES_SUCCESSFUL':
        return {
          ...state,
          getStepsMessages: {
            ...state.getStepsMessages,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_STEPS_MESSAGES_LOADING':
        return {
          ...state,
          getStepsMessages: {
            ...state.getStepsMessages,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_STEPS_MESSAGES_ERROR':
        return {
          ...state,
          getStepsMessages: {
            ...state.getStepsMessages,
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
      case 'CHANGE_OPEN_POPUP':
        return {
          ...state,
          openPopup: {
            ...state.openPopup,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      /* case 'GET_SERVICE_SUCCESSFUL':
        return {
          ...state,
          getService: {
            ...state.getService,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_SERVICE_LOADING':
        return {
          ...state,
          getService: {
            ...state.getService,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_SERVICE_ERROR':
        return {
          ...state,
          getService: {
            ...state.getService,
            data: null,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }; */
      default:
        return state;
    }
  };
  