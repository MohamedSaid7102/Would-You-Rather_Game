import { saveQuestionAnswer } from '../../utils/api';
import { saveQuestion } from '../../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

const addNewVote = (authedUser, qid, answer) => {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
};

const addNewQuestion = (qid, formattedQuestion) => {
  return {
    type: ADD_NEW_QUESTION,
    qid,
    formattedQuestion,
  };
};

export const handleAddNewQuestionToQuestions = (formattedQuestion) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      optionOneText: formattedQuestion.optionOne.text,
      optionTwoText: formattedQuestion.optionTwo.text,
      author: authedUser.authedUser,
    })
      .then((res) => {
        return dispatch(addNewQuestion(res.qid, res));
      })
      .catch((er) => console.log(`Error happened: `, er));
  };
};

export const handleAddQuestionVotes = ({ qid, answer }) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      authedUser: authedUser.authedUser,
      qid,
      answer,
    }).then((res) => {
      return dispatch(addNewVote(authedUser.authedUser, qid, answer));
    });
  };
};
