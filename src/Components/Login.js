import React, { Component } from 'react';
import { checkLoginUser } from '../utils/helpers';
import { connect } from 'react-redux';
import { setAuthedUser } from '../Redux/Actions/authedUser';
import { Redirect, withRouter } from 'react-router-dom';

class Login extends Component {
  state = {
    userName: '',
    pass: '',
    authed: false,
    redirectToReferrer: false, //if you are comming from a tap or not
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    if (this.state.userName && this.state.pass) {
      let userCheck = await checkLoginUser(
        this.state.userName,
        this.state.pass
      );

      this.setState({
        authed: userCheck != null,
      });

      if (this.state.authed) {
        this.props.dispatch(setAuthedUser(userCheck));
      } else this.props.dispatch(setAuthedUser(null));

      this.setState({
        userName: '',
        pass: '',
      });
      this.setState({ redirectToReferrer: true });
    }
  };
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }
    console.log(
      `we must go back to: `,
      this.props.location.state,
      '\nOr if previous is null: ',
      { from: { pathname: '/' } },
      '\n and from now is: ',
      from,
      '\n and redirectToReferrer is: ',
      this.state.redirectToReferrer
    );
    // debugger;
    return (
      <div className="wrapper">
        {console.log('login props are --->: ', this.props)}
        <div className="login-container">
          <h1 className="login__header">Login</h1>
          <form onSubmit={this.handleSignIn}>
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              value={this.state.userName}
              onChange={(e) => this.setState({ userName: e.target.value })}
            />
            <label htmlFor="userName">password</label>
            <input
              type="password"
              id="userName"
              value={this.state.pass}
              onChange={(e) => this.setState({ pass: e.target.value })}
            />
            <center>
              <button type="submit" className="login__button">
                Login
              </button>
            </center>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};
export default withRouter(connect(mapStateToProps)(Login));
