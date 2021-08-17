import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddNewQuestionToQuestions } from '../Redux/Actions/questions';
import { handleAddNewQuestionToUser } from '../Redux/Actions/users';
import { formatQuestion } from '../utils/helpers';
import { withRouter } from 'react-router-dom';

class CreateNewQuestion extends Component {
  state = {
    questionOne: '',
    questionTwo: '',
  };
  handleAddQuestion = (e) => {
    e.preventDefault();
    const questionOne = this.state.questionOne;
    const questionTwo = this.state.questionTwo;
    const { user, dispatch } = this.props;

    if (this.state.questionOne !== '' && this.state.questionTwo !== '') {
      const formattedQuestion = formatQuestion({
        optionOneText: questionOne,
        optionTwoText: questionTwo,
        author: user,
      });

      dispatch(handleAddNewQuestionToQuestions({ formattedQuestion })); //add new question to questions
      dispatch(
        handleAddNewQuestionToUser({
          qid: formattedQuestion.qid,
          formattedQuestion,
        })
      ); //add new question to user questions

      // Empty inputs
      this.setState({
        questionOne: '',
        questionTwo: '',
      });
      // This is to go back where we were before sign in
      let prevRouterPath =
        this.props.location.state !== null &&
        this.props.location.state !== undefined
          ? this.props.location.state.previous.pathname
          : '/';
      this.props.history.push(prevRouterPath);
    }
  };
  render() {
    return (
      <div className="component-wrapper">
        <div className="create-question">
          <center>
            <h1 className="question__heading">Create New Question 🖊</h1>
          </center>
          <form onSubmit={this.handleAddQuestion} className="question__body">
            <h2>Would You Rather ..</h2>
            <input
              type="text"
              placeholder="Enter Option One Text here..."
              value={this.state.questionOne}
              onChange={(e) => this.setState({ questionOne: e.target.value })}
            />
            <h3 className="or-separator">Or</h3>
            <input
              type="text"
              placeholder="Enter Option Two Text here..."
              value={this.state.questionTwo}
              onChange={(e) => this.setState({ questionTwo: e.target.value })}
            />
            <Button className="btn" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authedUser }) => {
  return {
    user: authedUser.authedUser,
  };
};
export default withRouter(connect(mapStateToProps)(CreateNewQuestion));
