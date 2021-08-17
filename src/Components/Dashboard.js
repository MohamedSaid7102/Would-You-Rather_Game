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
  // TODO: implement crete new question.
  // TODO: Revesion the rubrics
  // TODO: push the project 🚀
  // -----------------------------------
  // You don't have to but it's good to ❤
  // -----------------------------------
  // TODO: destingush betweeet the first top 3 in leader board with a batches and others
  // TODO: Add icons to the pages
  // TODO: add loading effect when login in and the user is authed & show error messege if the user is not authed
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
                  <h1>
                    Good job 🎉 You answered all of them✨ Try to add new ones
                    and challenge your frinds 🚀
                  </h1>
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

  let questionsArray = Object.keys(questions).map((qid) => ({
    qid,
    question: questions[qid],
  }));

  questionsArray.forEach(({ question }) => {
    let OptionOneVotes = question.optionOne.votes;
    let OptionTwoVotes = question.optionTwo.votes;
    if (
      !OptionOneVotes.includes(authedUser.authedUser) &&
      !OptionTwoVotes.includes(authedUser.authedUser)
    )
      unAnsweredQuestions.push(question);
    else answeredQuestions.push(question);
  });

  // b-a => most recent at the top && a-b => most old at the top
  if (unAnsweredQuestions.length > 1)
    unAnsweredQuestions.sort((a, b) => b.timestamp - a.timestamp);
  // b-a => most recent at the top && a-b => most old at the top
  if (answeredQuestions.length > 1)
    answeredQuestions.sort((a, b) => b.timestamp - a.timestamp);
  return {
    answeredQuestions,
    unAnsweredQuestions,
    authedUser: authedUser.authedUser,
  };
};

export default connect(mapStateToProps)(Dashboard);
