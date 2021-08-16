import { saveQuestionAnswer } from '../../utils/api';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_QUESTION = 'ADD_QUESTION';

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

const addQuestionToUser = (authedUser, qid, answer) => {
  return {
    type: ADD_QUESTION,
    authedUser,
    qid,
    answer,
  };
};

export const handleAddQuestionToUser = ({ qid, answer }) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    console.log(`data sent from user action creator: `, {
      'authedUser: ': authedUser.authedUser,
      'qid: ': qid,
      'answer: ': answer,
    });
    return saveQuestionAnswer({
      authedUser: authedUser.authedUser,
      qid,
      answer,
    }).then((res) => {
      console.log(`Returned result from data base after save: `, res);
      return dispatch(addQuestionToUser(authedUser.authedUser, qid, answer))
    }
    );
  };
};
