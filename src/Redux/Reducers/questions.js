/* eslint-disable import/no-anonymous-default-export */
import { RECEIVE_QUESTIONS } from '../Actions/questions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    default:
      return state;
  }
};
