import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Question from './Question';

// to avoid typos bugs
export const unAnswered = 'unAnswered';
export const answered = 'answered';
class Dashboard extends Component {
  state = {
    currentViewedSection: unAnswered,
  };

  render() {
    const { authedUser, answeredQuestions, unAnsweredQuestions } = this.props;
    console.log(authedUser, 'answered questions: ', answeredQuestions);
    console.log(`---------------------`);
    console.log(authedUser, 'unanswered questions: ', unAnsweredQuestions);

    return (
      <div className="component-wrapper">
        <div className="questions-dashboard">
          <div className="dashboard__navigation">
            <Button
              variant="outlined"
              color="primary"
              className="btn btn--lg-2-x btn--primary"
              onClick={() => this.setState({ currentViewedSection: answered })}
            >
              Answered Questions
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className="btn btn--lg-2-x btn--primary"
              onClick={() =>
                this.setState({ currentViewedSection: unAnswered })
              }
            >
              UnAnswered Questions
            </Button>
          </div>
          <div className="dashboard__questions">
            {this.state.currentViewedSection === unAnswered
              ? unAnsweredQuestions.map((question) => (
                  <Question key={question.id} question={question} />
                ))
              : answeredQuestions.map((question) => (
                  <Question key={question.id} question={question} />
                ))}
          </div>
        </div>
      </div>
    );
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
