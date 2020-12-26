import { Actions } from './actions';
import axios from 'axios';
import { Dispatch } from 'redux';

export const userAuthStatus = () => async (dispatch: Dispatch) => {
  const baseURL = {
    dev: 'http://localhost:5000/api/check-user-auth-status',
    prod: '',
  };

  const url = baseURL.dev;

  try {
    dispatch({ type: Actions.CHECK_USER_AUTH_STATUS_REQUEST });
    const { data } = await axios.get(url, { withCredentials: true });
    dispatch({ type: Actions.CHECK_USER_AUTH_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: Actions.CHECK_USER_AUTH_STATUS_FAIL, payload: error });
  }
};
