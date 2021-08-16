import React, { Component } from 'react';
import { connect } from 'react-redux';
class QuestionResult extends Component {
  state = {
    optionOne: 0,
    optionTwo: 0,
    userAnswer: '',
  };

  componentDidMount() {
    const { question } = this.props;
    let optionOneVotes = question.optionOne.votes.length;
    let optionTwoVotes = question.optionTwo.votes.length;
    let totalVotes = optionOneVotes + optionTwoVotes;
    let optionOneVotesPersent = ((optionOneVotes / totalVotes) * 100).toFixed(
      1
    );
    let optionTwoVotesPersent = ((optionTwoVotes / totalVotes) * 100).toFixed(
      1
    );
    this.setState({ optionOne: optionOneVotesPersent });
    this.setState({ optionTwo: optionTwoVotesPersent });
    const { user, questionId } = this.props;
    this.setState({userAnswer: user.answers[questionId]})
  }
  // TODO: determine which quesiton user answered and mark it
  render() {
    // card UI variables
    const authorName = this.props.questionAuthor.name;
    const authorAvatar = this.props.questionAuthor.avatarURL;
    const { optionOne, optionTwo } = this.props;
    // card logic variables
    return (
      <div className="question-card answer">
        <div className="card__header">{authorName} asks: </div>
        <div className="card__body">
          <div className="card__avatar">
            <img src={authorAvatar} alt={authorName} className="avatar__img" />
          </div>
          <div className="card__info">
            <h3 className="card__heading">Would You Rather..</h3>
            {/* 1 */}
            <div className={`question-vote ${this.state.userAnswer==='optionOne'?'user-selected':''}`}>
              <label htmlFor="optionOne">
                {`${this.state.optionOne}`}% {'▶ '}
                {optionOne}
              </label>
              <progress
                className="optionContent"
                value={`${this.state.optionOne}`}
                max="100"
              ></progress>
            </div>
            {/* 2 */}
            <div className={`question-vote ${this.state.userAnswer==='optionTwo'?'user-selected':''}`}>
              <label htmlFor="optionTwo">
                {`${this.state.optionTwo}`}% {'▶ '}
                {optionTwo}
              </label>
              <progress
                className="optionContent"
                value={`${this.state.optionTwo}`}
                max="100"
              ></progress>
            </div>
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
    user: users[authedUser.authedUser],
    question: currQuestion,
    questionAuthor: users[currQuestion.author],
    questionId: currQuestion.id,
    optionOne: currQuestion.optionOne.text,
    optionTwo: currQuestion.optionTwo.text,
  };
};
export default connect(mapStateToProps)(QuestionResult);
