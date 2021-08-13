/* eslint-disable import/no-anonymous-default-export */
import { SET_AUTHED_USER } from '../Acctions/authedUser';

export default (state = null, action) => {
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        ...state,
        authedUser: action.userID,
      };
    default:
      return state;
  }
};
