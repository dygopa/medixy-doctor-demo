export const CompanionsListReducer = (state: any, action: any) => {
    switch (action.type) {
      case "GET_COMPONIONS_LOADING" :
        return {
          ...state,
          getCompanions: {
            ...state.getComponions,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "GET_COMPONIONS_SUCCESSFUL" :
        return {
          ...state,
          getCompanions: {
            ...state.getCompanions,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        }
      case "GET_COMPONIONS_ERROR" :
        return {
          ...state,
          getCompanions: {
            ...state.getCompanions,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
        case 'CREATE_COMPANION_LOADING' :
          return {
            ...state,
            createCompanion: {
              ...state.createCompanion,
              data: false,
              loading: true,
              successful: false,
              error: null,
            },
          };
        case 'CREATE_COMPANION_SUCCESSFUL' :
          return {
            ...state,
            createCompanion: {
              ...state.createCompanion,
              data: true,
              loading: false,
              successful: true,
              error: null,
            },
          }
        case 'CREATE_COMPANION_ERROR' :
          return {
            ...state,
            createCompanion: {
              ...state.createCompanion,
              data: false,
              loading: false,
              successful: false,
              error: action.payload.error,
            },
          }
    }  
  }