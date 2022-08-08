import { combineReducers } from 'redux';
import user from './user';
import room from './room';

const rootReducer = combineReducers({
  user,
  room,
});

export default rootReducer;
