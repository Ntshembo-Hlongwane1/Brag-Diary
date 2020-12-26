import { Actions } from '../../Actions/CheckUserAuthStatus/actions';
import { Action } from 'redux';

interface ReduxAction<T> extends Action {
  payload: T;
}

export const userAuthStatusReducer = (
  state = { authStatus: [] },
  action: ReduxAction<any>
) => {
  switch (action.type) {
    case Actions.CHECK_USER_AUTH_STATUS_REQUEST:
      return { loading: true };
    case Actions.CHECK_USER_AUTH_STATUS_SUCCESS:
      return { loading: false, authStatus: action.payload };
    case Actions.CHECK_USER_AUTH_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
