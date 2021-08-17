import { Button, FormControlLabel, RadioGroup } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import { handleAddQuestionToUser } from '../../Redux/Actions/users';
import { handleAddQuestionVotes } from '../../Redux/Actions/questions';
import { formatDate } from '../../utils/helpers';

class QuestionAnswer extends Component {
  state = {
    answer: '',
  };

  handleUserAnswerSubmit = (e) => {
    e.preventDefault();
    if (this.state.answer !== '') {
      const { questionId } = this.props;
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
      );
    }
  };

  render() {
    const authorName = this.props.questionAuthor.name;
    const authorAvatar = this.props.questionAuthor.avatarURL;
    const { optionOne, optionTwo, question } = this.props;
    return (
      <div className="wrapper">
        <div className="question-card answer">
          <div className="card__header">{authorName} asks: </div>
          <div className="card__body">
            <div className="card__avatar">
              <img
                src={authorAvatar}
                alt={authorName}
                className="avatar__img"
              />
            </div>
            <div className="card__info">
              <h3 className="card__heading">
                {' '}
                <span className="time-duration">
                  {formatDate(question.timestamp)}
                </span>
                Would You Rather..
              </h3>
              <form
                onSubmit={this.handleUserAnswerSubmit}
                className="form-answer"
              >
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={this.state.answer}
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
                  className="btn btn--lg-1_5x btn--accent"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }, { question }) => {
  return {
    questionAuthor: users[question.author],
    questionId: question.id,
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text,
    question,
  };
};
export default connect(mapStateToProps)(QuestionAnswer);
