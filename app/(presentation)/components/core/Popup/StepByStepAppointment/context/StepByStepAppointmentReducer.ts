export const StepByStepAppointmentReducer = (state: any, action: any) => {
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
        case 'GET_LOCALITIES_LOADING':
            return {
                ...state,
                localities: {
                    ...state.localities,
                    data: null,
                    loading: true,
                    successful: false,
                    error: null,
                },
            };
        case 'GET_LOCALITIES_SUCCESSFUL':
            return {
                ...state,
                localities: {
                    ...state.localities,
                    data: action.payload.data,
                    loading: false,
                    successful: true,
                    error: null,
                },
            };
        case 'GET_LOCALITIES_ERROR':
            return {
                ...state,
                localities: {
                    ...state.localities,
                    data: null,
                    loading: false,
                    successful: false,
                    error: action.payload.error,
                },
            };
        case 'GET_SERVICES_LOADING':
            return {
                ...state,
                services: {
                    ...state.services,
                    data: null,
                    loading: true,
                    successful: false,
                    error: null,
                },
            };
        case 'GET_SERVICES_SUCCESSFUL':
            return {
                ...state,
                services: {
                    ...state.services,
                    data: action.payload.data,
                    loading: false,
                    successful: true,
                    error: null,
                },
            };
        case 'GET_SERVICES_ERROR':
            return {
                ...state,
                services: {
                    ...state.services,
                    data: null,
                    loading: false,
                    successful: false,
                    error: action.payload.error,
                },
            };
        case 'GET_SLOTS_LOADING':
            return {
                ...state,
                slots: {
                    ...state.slots,
                    data: null,
                    loading: true,
                    successful: false,
                    error: null,
                },
            };
        case 'GET_SLOTS_SUCCESSFUL':
            return {
                ...state,
                slots: {
                    ...state.slots,
                    data: action.payload.data,
                    loading: false,
                    successful: true,
                    error: null,
                },
            };
        case 'GET_SLOTS_ERROR':
            return {
                ...state,
                slots: {
                    ...state.slots,
                    data: null,
                    loading: false,
                    successful: false,
                    error: action.payload.error,
                },
            };
        case 'GET_PATIENTS_LOADING':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    data: null,
                    loading: true,
                    successful: false,
                    error: null,
                },
            };
        case 'GET_PATIENTS_SUCCESSFUL':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    data: action.payload.data,
                    loading: false,
                    successful: true,
                    error: null,
                },
            };
        case 'GET_PATIENTS_ERROR':
            return {
                ...state,
                patients: {
                    ...state.patients,
                    data: null,
                    loading: false,
                    successful: false,
                    error: action.payload.error,
                },
            };
        case 'CREATE_APPOINTMENT_LOADING':
            return {
                ...state,
                appointmentCreation: {
                    ...state.appointmentCreation,
                    data: null,
                    loading: true,
                    successful: false,
                    error: null,
                },
            };
        case 'CREATE_APPOINTMENT_SUCCESSFUL':
            return {
                ...state,
                appointmentCreation: {
                    ...state.appointmentCreation,
                    data: action.payload.data,
                    loading: false,
                    successful: true,
                    error: null,
                },
            };
        case 'CREATE_APPOINTMENT_ERROR':
            return {
                ...state,
                appointmentCreation: {
                    ...state.appointmentCreation,
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
  