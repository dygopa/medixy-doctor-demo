export const AutocompleteInputMedicinesReducer = (state: any, action: any) => {
    switch (action.type) {  
      case 'GET_MEDICINES_LOADING' :
        return {
          ...state,
          medicines: {
            ...state.medicines,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_MEDICINES_SUCCESSFUL' :
        return {
          ...state,
          medicines: {
            ...state.medicines,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_MEDICINES_ERROR' :
        return {
          ...state,
          medicines: {
            ...state.medicines,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
      }
  }