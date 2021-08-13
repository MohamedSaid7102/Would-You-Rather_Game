import { combineReducers } from 'redux';
import question from './questions';
import users from './users';
import authedUser from './authedUser';

export default combineReducers({
  question,
  users,
  authedUser,
});
