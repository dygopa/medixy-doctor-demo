export const MedicalCentersEditReducer = (state: any, action: any) => {
    switch (action.type) {
      case "GET_MEDICAL_CENTER_LOADING":
        return {
          ...state,
          getMedicalCenter: {
            ...state.getMedicalCenter,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "GET_MEDICAL_CENTER_SUCCESSFUL":
        return {
          ...state,
          getMedicalCenter: {
            ...state.getMedicalCenter,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case "GET_MEDICAL_CENTER_ERROR":
        return {
          ...state,
          getMedicalCenter: {
            ...state.getMedicalCenter,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        };

      case "UPDATE_MEDICAL_CENTER_LOADING":
        return {
          ...state,
          updateMedicalCenter: {
            ...state.updateMedicalCenter,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "UPDATE_MEDICAL_CENTER_SUCCESSFUL":
        return {
          ...state,
          updateMedicalCenter: {
            ...state.updateMedicalCenter,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case "UPDATE_MEDICAL_CENTER_ERROR":
        return {
          ...state,
          updateMedicalCenter: {
            ...state.updateMedicalCenter,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        };
    }
  };
  