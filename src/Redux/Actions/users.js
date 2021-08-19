import { saveQuestion, saveQuestionAnswer } from '../../utils/api';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_QUESTION_TO_AUTHED_USER = 'ADD_QUESTION_TO_AUTHED_USER';
export const SAVE_QUESTION_ANSWER_TO_AUTHED_USER =
  'SAVE_QUESTION_ANSWER_TO_AUTHED_USER';

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};
// for adding new answered question to user answered questions
const addQuestionToUser = (authedUser, qid, answer) => {
  return {
    type: SAVE_QUESTION_ANSWER_TO_AUTHED_USER,
    authedUser,
    qid,
    answer,
  };
};

// for creating question
const addNewQuestionTouser = (optionOne, optionTwo, user, qid) => {
  return {
    type: ADD_QUESTION_TO_AUTHED_USER,
    optionOne,
    optionTwo,
    user,
    qid,
  };
};
// for creating question
export const handleAddNewQuestionToUser = (formattedQuestion) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      optionOneText: formattedQuestion.optionOne.text,
      optionTwoText: formattedQuestion.optionTwo.text,
      author: authedUser.authedUser,
    }).then((res) => {
      return dispatch(
        addNewQuestionTouser(
          res.optionOne.text,
          res.optionTwo.text,
          res.author,
          res.qid
        )
      );
    });
  };
};

// for adding new answered question to user answered questions
export const handleAddQuestionToUser = ({ qid, answer }) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      authedUser: authedUser.authedUser,
      qid,
      answer,
    }).then((res) => {
      return dispatch(addQuestionToUser(authedUser.authedUser, qid, answer));
    });
  };
};
