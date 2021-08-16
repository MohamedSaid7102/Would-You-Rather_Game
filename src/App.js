import React from 'react';
import { handleInitialData } from './Redux/Actions/shared';
import { connect } from 'react-redux';
import Login from './Components/Login';
import Loader from './loader';
import Dashboard from './Components/Dashboard';
import { Route } from 'react-router';
import QuestionViewDashboard from './Components/QuestionViewDashboard';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { loading } = this.props;

    return (
      <div className="App">
        {loading ? (
          <div className="loading-icon">
            <Loader></Loader>
          </div>
        ) : (
          <React.Fragment>
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/question-view/:id" component={QuestionViewDashboard} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    loading: authedUser == null,
  };
};

export default connect(mapStateToProps)(App);
