import { Actions } from './actions';
import axios from 'axios';
import { Dispatch } from 'redux';

export const GetAllTrainees = () => async (dispatch: Dispatch) => {
  const baseURL = {
    dev: 'http://localhost:5000/api/get-trainee-list',
    prod: '',
  };

  const url = baseURL.dev;

  try {
    dispatch({ type: Actions.GET_ALL_TRAINEES_REQUEST });
    const { data } = await axios.get(url, { withCredentials: true });
    dispatch({ type: Actions.GET_ALL_TRAINEES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: Actions.GET_ALL_TRAINEES_FAIL, payload: error });
  }
};
