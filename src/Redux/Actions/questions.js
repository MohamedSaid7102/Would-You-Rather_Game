import { saveQuestionAnswer } from '../../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_NEW_VOTES = 'ADD_NEW_VOTES';

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

const addNewVote = (authedUser, qid, answer) => {
  return {
    type: ADD_NEW_VOTES,
    authedUser,
    qid,
    answer,
  };
};

export const handleAddQuestionVotes = ({ qid, answer }) => {
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
      return dispatch(addNewVote(authedUser.authedUser, qid, answer));
    });
  };
};
