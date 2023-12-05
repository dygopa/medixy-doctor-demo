export const MedicalCentersCreateReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CREATE_MEDICAL_CENTER_LOADING":
        return {
          ...state,
          createMedicalCenter: {
            ...state.createMedicalCenter,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "CREATE_MEDICAL_CENTER_SUCCESSFUL":
        return {
          ...state,
          createMedicalCenter: {
            ...state.createMedicalCenter,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case "CREATE_MEDICAL_CENTER_ERROR":
        return {
          ...state,
          createMedicalCenter: {
            ...state.createMedicalCenter,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        };
    }
  };
  