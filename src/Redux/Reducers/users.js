/* eslint-disable import/no-anonymous-default-export */
import { RECEIVE_USERS } from '../Acctions/users';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    default:
      return state;
  }
};

