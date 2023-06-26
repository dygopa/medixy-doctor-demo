export const DashboardReducer = (state: any, action: any) => {
    switch (action.type) {
      case "GET_TOTAL_DOCTORS_LOADING" :
        return {
          ...state,
          totalDoctors: {
            ...state.totalDoctors,
            data: 0,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "GET_TOTAL_DOCTORS_SUCCESSFUL" :
        return {
          ...state,
          totalDoctors: {
            ...state.totalDoctors,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        }
      case "GET_TOTAL_DOCTORS_ERROR" :
        return {
          ...state,
          totalDoctors: {
            ...state.totalDoctors,
            data: 0,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

      case "GET_TOTAL_PATIENTS_LOADING" :
        return {
          ...state,
          totalSubjects: {
            ...state.totalSubjects,
            data: 0,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "GET_TOTAL_PATIENTS_SUCCESSFUL" :
        return {
          ...state,
          totalSubjects: {
            ...state.totalSubjects,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        }
      case "GET_TOTAL_PATIENTS_ERROR" :
        return {
          ...state,
          totalSubjects: {
            ...state.totalSubjects,
            data: 0,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

      case "GET_TOTAL_APPOINTMENTS_LOADING" :
        return {
          ...state,
          totalAppointments: {
            ...state.totalAppointments,
            data: 0,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "GET_TOTAL_APPOINTMENTS_SUCCESSFUL" :
        return {
          ...state,
          totalAppointments: {
            ...state.totalAppointments,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        }
      case "GET_TOTAL_APPOINTMENTS_ERROR" :
        return {
          ...state,
          totalAppointments: {
            ...state.totalAppointments,
            data: 0,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

      case "GET_DOCTORS_LOADING" :
        return {
          ...state,
          doctors: {
            ...state.doctors,
            data: [],
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "GET_DOCTORS_SUCCESSFUL" :
        return {
          ...state,
          doctors: {
            ...state.doctors,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        }
      case "GET_DOCTORS_ERROR" :
        return {
          ...state,
          doctors: {
            ...state.doctors,
            data: [],
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

      case "GET_PATIENTS_LOADING" :
        return {
          ...state,
          subjects: {
            ...state.subjects,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "GET_PATIENTS_SUCCESSFUL" :
        return {
          ...state,
          subjects: {
            ...state.subjects,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        }
      case "GET_PATIENTS_ERROR" :
        return {
          ...state,
          subjects: {
            ...state.subjects,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
    }  
  }