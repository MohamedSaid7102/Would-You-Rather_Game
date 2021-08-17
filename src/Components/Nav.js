import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { BiMenuAltRight } from 'react-icons/bi';
import { logIn, setAuthedUser } from '../Redux/Actions/authedUser';

class Nav extends Component {
  state = {
    showNav: true,
    loggedIn: !this.props.authedUser == null,
  };

  handleLog = () => {
    this.props.authedUser == null
      ? this.props.dispatch(logIn)
      : this.props.dispatch(setAuthedUser(null));
  };

  render() {
    return (
      <nav className="app-nav">
        <BiMenuAltRight
          className={`humbrger-icon ${this.state.showNav? 'white':'black'}`}
          onClick={() =>
            this.setState(({ showNav }) => ({
              showNav: showNav ? false : true,
            }))
          }
        />
        <ul
          className="topnav"
          style={
            this.state.showNav ? { height: 'max-content' } : { height: '0' }
          }
        >
          <li>
            <NavLink to="/" exact id="home" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              id="createQuestion"
              activeClassName="active"
            >
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leaderboard"
              id="leaderBoard"
              activeClassName="active"
            >
              Leader board
            </NavLink>
          </li>
          {this.props.authedUser !== null ? (
            <li className="right" onClick={this.handleLog}>
              <NavLink to="/login" id="login" activeClassName="active">
                Log out
              </NavLink>
            </li>
          ) : (
            <li className="right" onClick={this.handleLog}>
              <NavLink to="/login" id="login" activeClassName="active">
                Log In
              </NavLink>
            </li>
          )}
          {this.props.authedUser !== null ? (
            <div className="user-greeting-wrapper">
              <li className="right user-greeting">
                Hello {this.props.userName}
                <Avatar
                  alt={`${this.props.userName}`}
                  src={`${this.props.userAvatarUrl}`}
                />
              </li>
            </div>
          ) : (
            ' '
          )}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  return {
    userName:
      authedUser.authedUser !== null
        ? users[authedUser.authedUser].name
        : 'User',
    userAvatarUrl:
      authedUser.authedUser !== null
        ? users[authedUser.authedUser].avatarURL
        : '',
    authedUser: authedUser.authedUser,
  };
};

export default connect(mapStateToProps)(Nav);
