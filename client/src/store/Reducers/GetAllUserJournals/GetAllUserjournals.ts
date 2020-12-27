import { GetUserJournals } from '../../Actions/GetAllUserJournals/GetJournals';
import { Actions } from '../../Actions/GetAllUserJournals/actions';
import { Action } from 'redux';

interface ReduxAction<T> extends Action {
  payload: T;
}

//Gets Journals for a specific user
export const GetAllUserJournalsReducers = (
  state = { userJournals: [] },
  action: ReduxAction<any>
) => {
  switch (action.type) {
    case Actions.FETCH_ALL_USER_JOURNALS_REQUEST:
      return { loading: true };
    case Actions.FETCH_ALL_USER_JOURNALS_SUCCESS:
      return { loading: false, userJournal: action.payload };
    case Actions.FETCH_ALL_USER_JOURNALS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
