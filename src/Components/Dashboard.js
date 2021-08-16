import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Question from './QuestionsForm/Question';

// to avoid typos bugs
export const unAnswered = 'unAnswered';
export const answered = 'answered';
class Dashboard extends Component {
  // TODO: move the state outside this component to redux so when user answer or view a question poll result and go back the viewed view will be the same as last time not every time on the unAsnswered
  // TODO: sort qustion as reburcube want
  // TODO: implement nav bar and handle it
  // TODO: ITI
  // TODO: implement leader board
  // TODO: implement crete new question
  // TODO: handle navbar and react router and navigation from the url
  // TODO: Add icons to the pages
  state = {
    currentViewedSection: answered,
  };

  render() {
    const { authedUser, answeredQuestions, unAnsweredQuestions } = this.props;
    return (
      <div className="component-wrapper">
        <div className="questions-dashboard">
          <div className="dashboard__navigation">
            <Button
              variant="outlined"
              color="primary"
              className={`btn btn--lg-2-x btn--primary ${
                this.state.currentViewedSection === answered
                  ? 'currentActiveSection'
                  : ''
              }`}
              onClick={() => this.setState({ currentViewedSection: answered })}
            >
              Answered Questions
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={`btn btn--lg-2-x btn--primary ${
                this.state.currentViewedSection === unAnswered
                  ? 'currentActiveSection'
                  : ''
              }`}
              onClick={() =>
                this.setState({ currentViewedSection: unAnswered })
              }
            >
              UnAnswered Questions
            </Button>
          </div>
          <div className="dashboard__questions">
            {this.state.currentViewedSection === unAnswered ? (
              unAnsweredQuestions.length !== 0 ? (
                unAnsweredQuestions.map((question) => (
                  <Question key={question.id} question={question} />
                ))
              ) : (
                <center>
                  <h1>Good job 🎉 You answered all of them✨</h1>
                </center>
              )
            ) : answeredQuestions.length !== 0 ? (
              answeredQuestions.map((question) => (
                <Question key={question.id} question={question} />
              ))
            ) : (
              <center>
                <h1>You didn't answer any question yet, let kick it off 🎯</h1>
              </center>
            )}
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
      !OptionOneVotes.includes(authedUser.authedUser) &&
      !OptionTwoVotes.includes(authedUser.authedUser)
    )
      unAnsweredQuestions.push(question);
    else answeredQuestions.push(question);
  });

  return {
    answeredQuestions,
    unAnsweredQuestions,
    authedUser: authedUser.authedUser,
  };
};

export default connect(mapStateToProps)(Dashboard);
