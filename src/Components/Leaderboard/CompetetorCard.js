import React, { Component } from 'react';

export default class CompetetorCard extends Component {
  render() {
    const { userName, userAvatar, numOfQUAsked, numOfQUAnswered, rank } =
      this.props;
    return (
      <div className="wrapper">
        {/* rank for the first top 3 with a patch destincet them */}
        <div className="card">
          {/* 1 */}
          <div className="card__avatar">
            <img src={userAvatar} alt={userName} className="avatar__img"/>
          </div>
          {/* 2 */}
          <div className="card__info">
          <h3 className="userName">{userName}</h3>
          <div className="number-of-questions">
            <p>Answered Questions</p>
            <p className="answer">{numOfQUAnswered}</p>
          </div>
          <div className="number-of-questions">
            <p>Created Questions</p>
            <p className="answer">{numOfQUAsked}</p>
          </div>
          </div>
          {/* 3 */}
          {/* Score */}
          <div className="score">
            <p className="score__text">Score</p>
            <p className="answer score__number">{numOfQUAsked+numOfQUAnswered}</p>
          </div>
        </div>
      </div>
    );
  }
}
