export const MedicalRecordReducer = (state: any, action: any) => {
    switch (action.type) {  
      case 'GET_SUBJECT_LOADING':
        return {
          ...state,
          subject: {
            ...state.subject,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_SUBJECT_SUCCESSFUL':
        return {
          ...state,
          subject: {
            ...state.subject,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_SUBJECT_ERROR':
        return {
          ...state,
          subject: {
            ...state.subject,
            data: null,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

      case 'GET_APPOINTMENT_LOADING':
        return {
          ...state,
          appointment: {
            ...state.appointment,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
          subject: {
            ...state.subject,
            data: null,
            loading: false,
            successful: false,
            error: null,
          },
        };
      case 'GET_APPOINTMENT_SUCCESSFUL':
        return {
          ...state,
          appointment: {
            ...state.appointment,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
          subject: {
            ...state.subject,
            data: action.payload.data.data.subject,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_APPOINTMENT_ERROR':
        return {
          ...state,
          appointment: {
            ...state.appointment,
            data: null,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
          subject: {
            ...state.subject,
            data: null,
            loading: false,
            successful: false,
            error: null,
          },
        }

      case "GET_MEDICAL_MEASURES_LOADING" :
        return {
          ...state,
          medicalMeasures: {
            ...state.medicalMeasures,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "GET_MEDICAL_MEASURES_SUCCESSFUL" :
        return {
          ...state,
          medicalMeasures: {
            ...state.medicalMeasures,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        }
      case "GET_MEDICAL_MEASURES_ERROR" :
        return {
          ...state,
          medicalMeasures: {
            ...state.medicalMeasures,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

      case "GET_MEDICAL_CONSULTIES_LOADING" :
        return {
          ...state,
          medicalConsulties: {
            ...state.medicalConsulties,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case "GET_MEDICAL_CONSULTIES_SUCCESSFUL" :
        return {
          ...state,
          medicalConsulties: {
            ...state.medicalConsulties,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        }
      case "GET_MEDICAL_CONSULTIES_ERROR" :
        return {
          ...state,
          medicalConsulties: {
            ...state.medicalConsulties,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

        case "GET_TREATMENTS_LOADING" :
          return {
            ...state,
            treatments: {
              ...state.treatments,
              data: {},
              loading: true,
              successful: false,
              error: null,
            },
          };
        case "GET_TREATMENTS_SUCCESSFUL" :
          return {
            ...state,
            treatments: {
              ...state.treatments,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          }
        case "GET_TREATMENTS_ERROR" :
          return {
            ...state,
            treatments: {
              ...state.treatments,
              data: {},
              loading: false,
              successful: false,
              error: action.payload.error,
            },
          }

        case "GET_ALLERGIES_LOADING" :
          return {
            ...state,
            allergies: {
              ...state.allergies,
              data: {},
              loading: true,
              successful: false,
              error: null,
            },
          };
        case "GET_ALLERGIES_SUCCESSFUL" :
          return {
            ...state,
            allergies: {
              ...state.allergies,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          }
        case "GET_ALLERGIES_ERROR" :
          return {
            ...state,
            allergies: {
              ...state.allergies,
              data: {},
              loading: false,
              successful: false,
              error: action.payload.error,
            },
          }

        case "GET_MEDICAL_RECORDS_LOADING" :
          return {
            ...state,
            medicalRecords: {
              ...state.medicalRecords,
              data: {},
              loading: true,
              successful: false,
              error: null,
            },
          };
        case "GET_MEDICAL_RECORDS_SUCCESSFUL" :
          return {
            ...state,
            medicalRecords: {
              ...state.medicalRecords,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          }
        case "GET_MEDICAL_RECORDS_ERROR" :
          return {
            ...state,
            medicalRecords: {
              ...state.medicalRecords,
              data: {},
              loading: false,
              successful: false,
              error: action.payload.error,
            },
          }

        case "GET_ORDERS_LOADING" :
          return {
            ...state,
            orders: {
              ...state.orders,
              data: {},
              loading: true,
              successful: false,
              error: null,
            },
          };
        case "GET_ORDERS_SUCCESSFUL" :
          return {
            ...state,
            orders: {
              ...state.orders,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          }
        case "GET_ORDERS_ERROR" :
          return {
            ...state,
            orders: {
              ...state.orders,
              data: {},
              loading: false,
              successful: false,
              error: action.payload.error,
            },
          }

          case 'GET_FEDERAL_ENTITIES_LOADING' :
            return {
              ...state,
              getFederalEntities: {
                ...state.getFederalEntities,
                data: [],
                loading: true,
                successful: false,
                error: null,
              },
            };
          case 'GET_FEDERAL_ENTITIES_SUCCESSFUL' :
            return {
              ...state,
              getFederalEntities: {
                ...state.getFederalEntities,
                data: action.payload.data,
                loading: false,
                successful: true,
                error: null,
              },
            };
          case 'GET_FEDERAL_ENTITIES_ERROR' :
            return {
              ...state,
              getFederalEntities: {
                ...state.getFederalEntities,
                data: [],
                loading: false,
                successful: false,
                error: action.payload.error,
              },
            }
      
          case 'EDIT_SUBJECT_LOADING' :
            return {
              ...state,
              editSubject: {
                ...state.editSubject,
                data: false,
                loading: true,
                successful: false,
                error: null,
              },
            };
          case 'EDIT_SUBJECT_SUCCESSFUL' :
            return {
              ...state,
              editSubject: {
                ...state.editSubject,
                data: true,
                loading: false,
                successful: true,
                error: null,
              },
            }
          case 'EDIT_SUBJECT_ERROR' :
            return {
              ...state,
              editSubject: {
                ...state.editSubject,
                data: false,
                loading: false,
                successful: false,
                error: action.payload.error,
              },
           }

      case "GET_COMPONIONS_LOADING" :
        return {
          ...state,
          companions: {
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
          companions: {
            ...state.companions,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        }
      case "GET_COMPONIONS_ERROR" :
        return {
          ...state,
          companions: {
            ...state.companions,
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

      case 'EDIT_APPOINTMENT_STATUS_LOADING':
        return {
          ...state,
          editAppointmentStatus: {
            ...state.editAppointmentStatus,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'EDIT_APPOINTMENT_STATUS_SUCCESSFUL':
        return {
          ...state,
          editAppointmentStatus: {
            ...state.editAppointmentStatus,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'EDIT_APPOINTMENT_STATUS_ERROR':
        return {
          ...state,
          editAppointmentStatus: {
            ...state.editAppointmentStatus,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

      case 'GET_TREATMENT_PDF_LOADING':
        return {
          ...state,
          getTreatmentPDF: {
            ...state.getTreatmentPDF,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_TREATMENT_PDF_SUCCESSFUL':
        return {
          ...state,
          getTreatmentPDF: {
            ...state.getTreatmentPDF,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_TREATMENT_PDF_ERROR':
        return {
          ...state,
          getTreatmentPDF: {
            ...state.getTreatmentPDF,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

      case 'GET_MEDICAL_CONSULTY_PDF_LOADING':
        return {
          ...state,
          getMedicalConsultyPDF: {
            ...state.getMedicalConsultyPDF,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_MEDICAL_CONSULTY_PDF_SUCCESSFUL':
        return {
          ...state,
          getMedicalConsultyPDF: {
            ...state.getMedicalConsultyPDF,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_MEDICAL_CONSULTY_PDF_ERROR':
        return {
          ...state,
          getMedicalConsultyPDF: {
            ...state.getMedicalConsultyPDF,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }

      case 'GET_MEDICAL_RECORD_PDF_LOADING':
        return {
          ...state,
          getMedicalRecordPDF: {
            ...state.getMedicalRecordPDF,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_MEDICAL_RECORD_PDF_SUCCESSFUL':
        return {
          ...state,
          getMedicalRecordPDF: {
            ...state.getMedicalRecordPDF,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_MEDICAL_RECORD_PDF_ERROR':
        return {
          ...state,
          getMedicalRecordPDF: {
            ...state.getMedicalRecordPDF,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        };
      case 'UPDATE_AVATAR_LOADING':
        return {
          ...state,
          updateAvatar: {
            ...state.updateAvatar,
            data: null,
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'UPDATE_AVATAR_SUCCESSFUL':
        return {
          ...state,
          updateAvatar: {
            ...state.updateAvatar,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'UPDATE_AVATAR_ERROR':
        return {
          ...state,
          updateAvatar: {
            ...state.updateAvatar,
            data: null,
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        };
      case 'GET_MUNICIPALITIES_LOADING' :
        return {
          ...state,
          municipalities: {
            ...state.municipalities,
            data: {},
            loading: true,
            successful: false,
            error: null,
          },
        };
      case 'GET_MUNICIPALITIES_SUCCESSFUL' :
        return {
          ...state,
          municipalities: {
            ...state.municipalities,
            data: action.payload.data,
            loading: false,
            successful: true,
            error: null,
          },
        };
      case 'GET_MUNICIPALITIES_ERROR' :
        return {
          ...state,
          municipalities: {
            ...state.municipalities,
            data: {},
            loading: false,
            successful: false,
            error: action.payload.error,
          },
        }
        case 'GET_COUNTRY_LOCATIONS_LOADING' :
          return {
            ...state,
            countryLocations: {
              ...state.countryLocations,
              data: {},
              loading: true,
              successful: false,
              error: null,
            },
          };
        case 'GET_COUNTRY_LOCATIONS_SUCCESSFUL' :
          return {
            ...state,
            countryLocations: {
              ...state.countryLocations,
              data: action.payload.data,
              loading: false,
              successful: true,
              error: null,
            },
          };
        case 'GET_COUNTRY_LOCATIONS_ERROR' :
          return {
            ...state,
            countryLocations: {
              ...state.countryLocations,
              data: {},
              loading: false,
              successful: false,
              error: action.payload.error,
            },
          }
    }
  }