import { combineReducers } from 'redux';
import user from './user'
import article from './article'

const rootReducer = combineReducers({
  user, article,
});

export default rootReducer;