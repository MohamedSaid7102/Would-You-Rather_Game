import React, { Component } from 'react';
import CompetetorCard from './CompetetorCard';
import { connect } from 'react-redux';

class LeaderBoard extends Component {
  render() {
    const {users} = this.props;
    console.log(users);
    return (
      <div className='leader-board'>
        LeaderBoard
        <CompetetorCard />
        <CompetetorCard />
        <CompetetorCard />
      </div>
    );
  }
}

const mapStateToProps = ({users}) => {
  return {
    users
  }
}
export default connect(mapStateToProps)(LeaderBoard);
