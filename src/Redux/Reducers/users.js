/* eslint-disable import/no-anonymous-default-export */
import { RECEIVE_USERS, ADD_QUESTION } from '../Actions/users';

export default (state = {}, action) => {
  
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION:
      console.log(`data received in ADD_QUESTION reducer: `, {
        'authedUser: ': action.authedUser,
        'qid: ': action.qid,
        'answer: ': action.answer,
      });
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
      
    default:
      return state;
  }
};
