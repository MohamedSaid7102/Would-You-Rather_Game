import React from 'react';
import { handleInitialData } from './Redux/Actions/shared';
import { connect } from 'react-redux';
import Login from './Components/Login';
import Loader from './loader';
import Dashboard from './Components/Dashboard';
import { Route } from 'react-router';

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
            <Route path="/login" component={Login} />
            <Route path="/" exact component={Dashboard} />
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
