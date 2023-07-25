export const AutocompleteInputStatesReducer = (state: any, action: any) => {
    switch (action.type) {  
      case 'GET_FEDERAL_ENTITIES_LOADING' :
        return {
          ...state,
          federalEntities: {
            ...state.federalEntities,
            data: [],
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_FEDERAL_ENTITIES_SUCCESSFUL' :
        return {
          ...state,
          federalEntities: {
            ...state.federalEntities,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_FEDERAL_ENTITIES_ERROR' :
        return {
          ...state,
          federalEntities: {
            ...state.federalEntities,
            data: [],
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
        case 'GET_FEDERAL_ENTITY_LOADING' :
          return {
            ...state,
            federalEntity: {
              ...state.federalEntity,
              data: {},
              loading: true,
              successful: false,
              error: null,
            },
          };
        case 'GET_FEDERAL_ENTITY_SUCCESSFUL' :
          return {
            ...state,
            federalEntity: {
              ...state.federalEntity,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          };
        case 'GET_FEDERAL_ENTITY_ERROR' :
          return {
            ...state,
            federalEntity: {
              ...state.federalEntity,
              data: {},
              loading: false,
              successful: false,
              error: action.payload.error,
            },
          }
      }
  }