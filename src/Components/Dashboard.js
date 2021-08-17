import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Question from './QuestionsForm/Question';

// to avoid typos bugs
export const unAnswered = 'unAnswered';
export const answered = 'answered';
class Dashboard extends Component {
  // -----------------------------------
  // big ones
  // -----------------------------------
  // TODO: implement leader board
  // TODO: implement crete new question
  // -----------------------------------
  // Small ones
  // -----------------------------------
  // TODO: sort qustion as reburcube want
  // TODO: Add icons to the pages
  // TODO: see all other todos.
  // TODO: Revesion the rubrics
  // TODO: clean up your comments and logs 
  state = {
    currentViewedSection: unAnswered,
  };

  render() {
    const { answeredQuestions, unAnsweredQuestions } = this.props;
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
  // console.log('answeredQuestions before sorting:', answeredQuestions);
  // console.log('unAnsweredQuestions before sorting:', unAnsweredQuestions);
  // console.log(`\n-------------------------\n`);
  // // answeredQuestions = answeredQuestions.forEach(question=>).sort(
  // //   (a, b) => unAnsweredQuestions[a].timestamp - unAnsweredQuestions[b].timestamp
  // //   )
  // //   unAnsweredQuestions = unAnsweredQuestions.sort(
  // //     (a, b) => unAnsweredQuestions[a].timestamp - unAnsweredQuestions[b].timestamp
  // //     )
  //     console.log(`\n-------------------------\n`);
  //     console.log('answeredQuestions after sorting:', answeredQuestions);
  //     console.log('unAnsweredQuestions after sorting:', unAnsweredQuestions);
  return {
    answeredQuestions: answeredQuestions.sort(),
    unAnsweredQuestions: unAnsweredQuestions.sort(),
    authedUser: authedUser.authedUser,
  };
};

export default connect(mapStateToProps)(Dashboard);
