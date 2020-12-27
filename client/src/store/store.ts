import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { userAuthStatusReducer } from './Reducers/CheckUserAuthStatus/UserAuthStatus';
import { GetAllUserJournalsReducers } from './Reducers/GetAllUserJournals/GetAllUserjournals';

const initialState = {};

//Window Interface declaration type to work with TypeScript
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reducer = combineReducers({
  userAuthStatus: userAuthStatusReducer,
  allUserJournals: GetAllUserJournalsReducers,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
