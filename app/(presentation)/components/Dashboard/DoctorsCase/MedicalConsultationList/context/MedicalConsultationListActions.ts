import { Dispatch } from 'react';

export interface IMedicalConsultationListActions {
  getMedicalConsultation: Function;
}

const getMedicalConsultation = () => async (dispatch: Dispatch<any>) => {
   try {
    dispatch({ type: 'GET_MEDICAL_CONSULTATIONS_LOADING' });

    const dates:any =  [];


    dispatch({
      type: 'GET_MEDICAL_CONSULTATIONS_SUCESSFUL',
      payload: { data: dates },
    });
   } catch (error) {
    dispatch({ type: 'GET_MEDICAL_CONSULTATIONS_ERROR', payload: { error: error } });
   }
};

export const actions = {
  getMedicalConsultation,
};
