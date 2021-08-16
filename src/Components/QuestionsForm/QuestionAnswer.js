import { Button, FormControlLabel, RadioGroup } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import { handleAddQuestionToUser } from '../../Redux/Actions/users';
import { handleAddQuestionVotes } from '../../Redux/Actions/questions';

// const optionOne = 'optionOne';
// const optionTwo = 'optionTwo';

// TODO: Responsiveness for the card and a little styling
class QuestionAnswer extends Component {
  state = {
    answer: '',
  };

  handleUserAnswerSubmit = (e) => {
    e.preventDefault();
    const { questionId } = this.props;
    console.log(`passed data to dispatch: \n ------------ \n`, {
      qid: questionId,
      answer: this.state.answer,
    });
    this.props.dispatch(
      handleAddQuestionToUser({
        qid: questionId,
        answer: this.state.answer,
      })
    );
    this.props.dispatch(
      handleAddQuestionVotes({
        qid: questionId,
        answer: this.state.answer,
      })
    )
  };

  render() {
    const authorName = this.props.questionAuthor.name;
    const authorAvatar = this.props.questionAuthor.avatarURL;
    const { optionOne, optionTwo } = this.props;

    return (
      <div className="question-card answer">
        <div className="card__header">{authorName} asks: </div>
        <div className="card__body">
          <div className="card__avatar">
            <img src={authorAvatar} alt={authorName} className="avatar__img" />
          </div>
          <div className="card__info">
            <h3 className="card__heading">Would You Rather..</h3>
            <form onSubmit={this.handleUserAnswerSubmit}>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={this.state.answer}
                // this.setState({answer: e.target.defaultValue})
                onChange={(e) => this.setState({ answer: e.target.value })}
              >
                <FormControlLabel
                  value="optionOne"
                  control={<Radio />}
                  className="card__question"
                  label={`${optionOne}`}
                />
                <FormControlLabel
                  value="optionTwo"
                  control={<Radio />}
                  className="card__question"
                  label={`${optionTwo}`}
                />
              </RadioGroup>

              <Button
                variant="contained"
                color="secondary"
                className="btn btn--lg-1_5x btn--accent"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser, questions }, { question }) => {
  const currQuestion = questions[question.id];
  return {
    // userId: users[authedUser.authedUser].id,
    // user: users[authedUser.authedUser],
    questionAuthor: users[currQuestion.author],
    questionId: currQuestion.id,
    optionOne: currQuestion.optionOne.text,
    optionTwo: currQuestion.optionTwo.text,
  };
};
export default connect(mapStateToProps)(QuestionAnswer);
