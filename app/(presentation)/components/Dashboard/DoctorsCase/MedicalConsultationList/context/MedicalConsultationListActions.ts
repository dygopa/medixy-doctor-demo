import { Dispatch } from 'react';

export interface IMedicalConsultationListActions {
  getMedicalConsultation: Function;
}

const getMedicalConsultation = () => async (dispatch: Dispatch<any>) => {
   try {
    dispatch({ type: 'GET_MEDICAL_CONSULTATIONS_LOADING' });

    const dates =  [
      {
        id_date: 1,
        user: "Martin Mendez",
        service: "Dolor de Hombro Izquierdo",
        date: "10/01/2023",
        hour: "12:00",
        pic_profile:
          "https://accountmanagement.gettyimages.com/Account/ProfileImage/8b931d4f-f756-4ae1-9380-e4ed329a4ce1.jpg",
      },
      {
        id_date: 2,
        user: "Martin Mendez",
        service: "Dolor de Hombro Izquierdo",
        date: "10/01/2023",
        hour: "12:00",
        pic_profile:
          "https://accountmanagement.gettyimages.com/Account/ProfileImage/8b931d4f-f756-4ae1-9380-e4ed329a4ce1.jpg",
      },
      {
        id_date: 3,
        user: "Martin Mendez",
        service: "Dolor de Hombro Izquierdo",
        date: "10/01/2023",
        hour: "12:00",
        pic_profile:
          "https://accountmanagement.gettyimages.com/Account/ProfileImage/8b931d4f-f756-4ae1-9380-e4ed329a4ce1.jpg",
      },
      {
        id_date: 4,
        user: "Martin Mendez",
        service: "Dolor de Hombro Izquierdo",
        date: "10/01/2023",
        hour: "12:00",
        pic_profile:
          "https://accountmanagement.gettyimages.com/Account/ProfileImage/8b931d4f-f756-4ae1-9380-e4ed329a4ce1.jpg",
      },
    ];


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
