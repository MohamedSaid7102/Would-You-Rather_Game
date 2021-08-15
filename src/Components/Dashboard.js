import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    const { authedUser, answeredQuestions, unAnsweredQuestions } = this.props;
    console.log(authedUser, 'answered questions: ', answeredQuestions);
    console.log(`---------------------`);
    console.log(authedUser, 'unanswered questions: ', unAnsweredQuestions);

    return <div>Dashboard</div>;
  }
}

// exclude answered and unanswered questions
const mapStateToProps = ({ questions, authedUser }) => {
  let answeredQuestions = [];
  let unAnsweredQuestions = [];
  Object.keys(questions).forEach((questionId) => {
    let question = questions[questionId];
    let OptionOneVotes = question.optionOne.votes;
    let OptionTwoVotes = question.optionTwo.votes;
    if (
      OptionOneVotes.includes(authedUser.authedUser) ||
      OptionTwoVotes.includes(authedUser.authedUser)
    )
      answeredQuestions.push(question);
    if (
      !OptionOneVotes.includes(authedUser.authedUser) &&
      !OptionTwoVotes.includes(authedUser.authedUser)
    )
      unAnsweredQuestions.push(question);
  });

  return {
    answeredQuestions,
    unAnsweredQuestions,
    authedUser: authedUser.authedUser,
  };
};

export default connect(mapStateToProps)(Dashboard);
