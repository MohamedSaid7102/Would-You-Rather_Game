/* eslint-disable import/no-anonymous-default-export */
import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION_ANSWER,
  ADD_NEW_QUESTION,
} from '../Actions/questions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION_ANSWER:
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
    case ADD_NEW_QUESTION:
      return {
        ...state,
        [action.qid]: action.formattedQuestion,
      };
    default:
      return state;
  }
};
