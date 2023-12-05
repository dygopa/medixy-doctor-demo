export const MedicalCentersListReducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET_MEDICAL_CENTERS_LOADING":
      return {
        ...state,
        medicalCenters: {
          ...state.medicalCenters,
          data: {},
          loading: true,
          successful: false,
          error: null,
        },
      };
    case "GET_MEDICAL_CENTERS_SUCCESSFUL":
      return {
        ...state,
        medicalCenters: {
          ...state.medicalCenters,
          data: action.payload.data,
          loading: false,
          successful: true,
          error: null,
        },
      };
    case "GET_MEDICAL_CENTERS_ERROR":
      return {
        ...state,
        medicalCenters: {
          ...state.medicalCenters,
          data: {},
          loading: false,
          successful: false,
          error: action.payload.error,
        },
      };
  }
};
