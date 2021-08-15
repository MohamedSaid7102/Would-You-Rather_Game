import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { unAnswered } from './Dashboard';

class Question extends Component {
  render() {
    // const { user } = this.props; //incase you need the current user data - don't forget to uncomment the below user
    const authorName = this.props.questionAuthor.name;
    const authorAvatar = this.props.questionAuthor.avatarURL;
    const { optionOne, optionTwo } = this.props;
    console.log(`Question props are: `, authorName, optionOne, optionTwo);
    return (
      <div className="question-card">
        <div className="card__header">{authorName} asks: </div>
        <div className="card__body">
        <div className="card__avatar">
            <img src={authorAvatar} alt={authorName} className="avatar__img" />
          </div>
        <div className="card__info">
            <h3 className="card__heading">Would You Rather..</h3>
            <p className="card__question">
              {optionOne.substring(0,7)}...
              <br />
              <span className="card__Or-separator">Or</span>
              <br />
              {optionTwo.substring(0,5)}...
            </p>
            <Button
              variant="contained"
              color="secondary"
              className="btn btn--lg-1_5x btn--secondary"
              onClick={() =>
                this.setState({ currentViewedSection: unAnswered })
              }
            >
              View Poll
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ users, authedUser }, { question }) => {
  return {
    // user: users[authedUser.authedUser],
    questionAuthor: users[question.author],
    optionOne: question.optionOne.text,
    optionTwo: question.optionTwo.text,
  };
};
export default connect(mapStateToProps)(Question);
