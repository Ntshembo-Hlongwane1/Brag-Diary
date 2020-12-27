import { Actions } from './actions';
import axios from 'axios';
import { Dispatch } from 'redux';

export const GetUserJournals = () => async (dispatch: Dispatch) => {
  const baseURL = {
    dev: 'http://localhost:5000/api/get-all-user-journals',
    prod: '',
  };
  const url = baseURL.dev;

  try {
    dispatch({ type: Actions.FETCH_ALL_USER_JOURNALS_REQUEST });
    const { data } = await axios.get(url, { withCredentials: true });
    dispatch({
      type: Actions.FETCH_ALL_USER_JOURNALS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: Actions.FETCH_ALL_USER_JOURNALS_FAIL, payload: error });
  }
};
