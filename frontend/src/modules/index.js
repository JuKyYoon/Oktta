import { combineReducers } from 'redux';
import user from './user';
import session from './session';

const rootReducer = combineReducers({
  user,
  session,
});

export default rootReducer;
