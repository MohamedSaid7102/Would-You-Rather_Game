import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionAnswer from './QuestionsForm/QuestionAnswer';
import QuestionResult from './QuestionsForm/QuestionResult';

class QuestionViewDashboard extends Component {
  render() {
    // The most 2 important variables here is
    // 1. answeredQuestions: contains all current authedUser answered questions and it's answers
    // 2. currentUserAnswers: contain all current authedUsser answered questions to make it easy for us to iterate over it.
    const { id, question, currentUser } = this.props;
    let currentUserAnswers = [];
    currentUserAnswers.push(
      Object.keys(currentUser.answers).map((key) => {
        return {
          id: key,
          answer: currentUser.answers[key],
        };
      })
    );
    let answeredQuestions = [];
    currentUserAnswers = currentUserAnswers[0]; //get the first item
    answeredQuestions.push(currentUserAnswers.map((question) => question.id));
    answeredQuestions = answeredQuestions[0]; //get the first item

    if (answeredQuestions.includes(id))
      return <QuestionResult question={question} />;
    if (!answeredQuestions.includes(id))
      return <QuestionAnswer question={question} />;
    return <div></div>;
  }
}

const mapStateToProps = ({ questions, authedUser, users }, props) => {
  const { id } = props.match.params;
  return {
    id,
    question: questions[id],
    currentUser: users[authedUser.authedUser],
  };
};
export default connect(mapStateToProps)(QuestionViewDashboard);
