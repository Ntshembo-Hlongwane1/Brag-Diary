import { Actions } from '../../Actions/GetTraineesList/actions';
import { Action } from 'redux';

interface ReduxAction<T> extends Action {
  payload: T;
}

export const GetAllTraineesReducer = (
  state = { traineesList: [] },
  action: ReduxAction<any>
) => {
  switch (action.type) {
    case Actions.GET_ALL_TRAINEES_REQUEST:
      return { loading: true };
    case Actions.GET_ALL_TRAINEES_SUCCESS:
      return { loading: false, traineesList: action.payload };
    case Actions.GET_ALL_TRAINEES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
