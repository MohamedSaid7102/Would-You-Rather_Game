import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../utils/helpers';
class QuestionResult extends Component {
  state = {
    userAnswer: '',
  };

  componentDidMount() {
    const { user, questionId } = this.props;
    this.setState({ userAnswer: user.answers[questionId] });
  }

  render() {
    const { question, optionOne, optionTwo } = this.props;
    let optionOneVotes = question.optionOne.votes.length;
    let optionTwoVotes = question.optionTwo.votes.length;
    let totalVotes = optionOneVotes + optionTwoVotes;
    let optionOneVotesPersent = ((optionOneVotes / totalVotes) * 100).toFixed(
      1
    );
    let optionTwoVotesPersent = ((optionTwoVotes / totalVotes) * 100).toFixed(
      1
    );
    // card UI variables
    const authorName = this.props.questionAuthor.name;
    const authorAvatar = this.props.questionAuthor.avatarURL;
    // card logic variables
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
                <span className="time-duration">
                  {formatDate(question.timestamp)}
                </span>
                Result..
              </h3>
              {/* 1 */}
              <div
                className={`question-vote ${
                  this.state.userAnswer === 'optionOne' ? 'user-selected' : ''
                }`}
              >
                <label htmlFor="optionOne">
                  {`${optionOneVotesPersent}% ― ${optionOneVotes} out of ${totalVotes}
            votes`}
                  {'▶ '}
                  {optionOne}
                </label>
                <progress
                  className="optionContent"
                  value={`${optionOneVotesPersent}`}
                  max="100"
                ></progress>
              </div>
              {/* 2 */}
              <div
                className={`question-vote ${
                  this.state.userAnswer === 'optionTwo' ? 'user-selected' : ''
                }`}
              >
                <label htmlFor="optionTwo">
                  {`${optionTwoVotesPersent}% ― ${optionTwoVotes} out of ${totalVotes}
            votes`}{' '}
                  {'▶ '}
                  {optionTwo}
                </label>
                <progress
                  className="optionContent"
                  value={`${optionTwoVotesPersent}`}
                  max="100"
                ></progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser }, { question }) => {
  return {
    user: users[authedUser.authedUser],
    question,
    questionAuthor: users[question.author],
    questionId: question.id,
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text,
  };
};
export default connect(mapStateToProps)(QuestionResult);
