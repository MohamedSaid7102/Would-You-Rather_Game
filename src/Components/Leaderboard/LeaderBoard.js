import React, { Component } from 'react';
import CompetetorCard from './CompetetorCard';
import { connect } from 'react-redux';

class LeaderBoard extends Component {
  render() {
    const { users } = this.props;
    let sortedUsers = Object.values(users).sort(
      (a, b) =>
        b.questions.length +
        Object.keys(b.answers).length -
        (a.questions.length + Object.keys(a.answers).length)
    );
    return (
      <div className="wrapper">
        <center>
          <h1>Leader Board 🏆</h1>
        </center>
        <div className="leader-board">
          {Object.values(sortedUsers).map((user) => (
            <CompetetorCard
              key={user.id}
              userName={user.name}
              userAvatar={user.avatarURL}
              numOfQUAsked={user.questions.length}
              numOfQUAnswered={Object.keys(user.answers).length}
              rank="normal"
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(LeaderBoard);
