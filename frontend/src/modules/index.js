import { combineReducers } from 'redux';
import user from './user'
import sessionState from './sessionState'

const rootReducer = combineReducers({
  user, sessionState,
});

export default rootReducer;