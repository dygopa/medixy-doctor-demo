export interface IMedicalConsultationListState {
  consultations: IGetMedicalConsultationsState;
}

interface IGetMedicalConsultationsState {
  data: [];
  loading: boolean;
  sucessful: boolean;
  error: null;
}

export const initialState = {
    consultations: {
        data: [],
        loading: false,
        sucessful: false,
        error: null,
    },
};
