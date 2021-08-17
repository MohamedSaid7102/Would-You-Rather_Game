import React from 'react';
import { handleInitialData } from './Redux/Actions/shared';
import { connect } from 'react-redux';
import Login from './Components/Login';
import Loader from './loader';
import Dashboard from './Components/Dashboard';
import QuestionViewDashboard from './Components/QuestionViewDashboard';
import Nav from './Components/Nav';
import CreateNewQuestion from './Components/CreateNewQuestion';
import LeaderBoard from './Components/Leaderboard/LeaderBoard';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';

let loggedIn = false;
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedIn === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { loading, authedUser } = this.props;
    loggedIn = authedUser !== null;
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            {loading ? (
              <div className="loading-icon">
                <Loader></Loader>
              </div>
            ) : (
              <React.Fragment>
                <Nav />
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute
                    exact
                    path="/create-new-question"
                    component={CreateNewQuestion}
                  />
                  <PrivateRoute
                    exact
                    path="/leader-board"
                    component={LeaderBoard}
                  />
                  <PrivateRoute
                    exact
                    path="/question-view/:id"
                    component={QuestionViewDashboard}
                  />
                  <Route render={() => <ErrorPage />} />
                </Switch>
              </React.Fragment>
            )}
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    loading: authedUser == null,
    authedUser: authedUser !== null ? authedUser.authedUser : null,
  };
};

export default connect(mapStateToProps)(App);
