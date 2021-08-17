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

// console.log(`-------------\nbefore sorting\n---------------`);
//   console.log(`Questions array is: `, questionsArray);
//   console.log(`unAnsweredQuestions is: `, unAnsweredQuestions);
//   console.log(`answeredQuestions is: `, answeredQuestions);
//   if(unAnsweredQuestions.length!==0) unAnsweredQuestions.sort((a,b)=>unAnsweredQuestions[a].timestamp - unAnsweredQuestions[b].timestamp);
//   if(answeredQuestions.length!==0) answeredQuestions.sort((a,b)=>answeredQuestions[a].timestamp - answeredQuestions[b].timestamp);

//   // // first get all ids for answeredQuestions
//   // let answeredQuestionsIds = answeredQuestions.map(({ id }) => id);
//   // // then sort them as you like
//   // answeredQuestionsIds.sort(
//   //   (a, b) => questions[b].timestamp - questions[a].timestamp
//   // );
//   // // after that empty the origimal array to store in it the new sorted questions
//   // answeredQuestions = [];
//   // answeredQuestionsIds.forEach((id) => {
//   //   if (!typeof questions[answeredQuestionsIds] === undefined)
//   //     answeredQuestions.push(questions[answeredQuestionsIds]);
//   // });
//   // // first get all ids for uanAnsweredQuestions
//   // let unAnsweredQuestionsIds = unAnsweredQuestions.map(({ id }) => id);
//   // // then sort them as you like
//   // unAnsweredQuestionsIds.sort(
//   //   (a, b) => questions[b].timestamp - questions[a].timestamp
//   // );
//   // // after that empty the origimal array to store in it the new sorted questions
//   // unAnsweredQuestions = [];
//   // unAnsweredQuestionsIds.forEach((id) => {
//   //   if (!typeof questions[unAnsweredQuestionsIds] === undefined)
//   //     unAnsweredQuestions.push(questions[unAnsweredQuestionsIds]);
//   // });
//   console.log(`-------------\nafter sorting\n---------------`);
//   console.log(`Questions array is: `, questionsArray);
//   console.log(`unAnsweredQuestions is: `, unAnsweredQuestions);
//   console.log(`answeredQuestions is: `, answeredQuestions);
