/* eslint-disable import/no-anonymous-default-export */
import { RECEIVE_QUESTIONS, ADD_NEW_VOTES } from '../Actions/questions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_NEW_VOTES:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      };
    default:
      return state;
  }
};
