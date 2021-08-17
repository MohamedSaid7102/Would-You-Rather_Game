/* eslint-disable import/no-anonymous-default-export */
import {
  RECEIVE_USERS,
  ADD_QUESTION_TO_AUTHED_USER,
  SAVE_QUESTION_ANSWER_TO_AUTHED_USER,
} from '../Actions/users';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SAVE_QUESTION_ANSWER_TO_AUTHED_USER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      };
    case ADD_QUESTION_TO_AUTHED_USER:
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          questions: state[action.user].questions.concat([action.qid]),
        },
      };
    default:
      return state;
  }
};
