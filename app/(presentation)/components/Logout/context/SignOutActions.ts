
import AuthUseCase from 'domain/useCases/register/registerUseCase';
import { Dispatch } from 'react';

export interface ISignOutActions {
  signOutUser: () => (dispatch: Dispatch<any>) => {};
}

const signOutUser = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: 'SIGN_OUT_USER_LOADING' });

    const res = await new AuthUseCase().signOut();

    dispatch({
      type: 'SIGN_OUT_USER_SUCCESSFUL',
      payload: { data: res, successful: true },
    });
  } catch (error) {
    dispatch({ type: 'SIGN_OUT_USER_ERROR', payload: { error: error } });
  }
};

export const actions = {
  signOutUser,
};
