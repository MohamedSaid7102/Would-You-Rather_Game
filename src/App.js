import React from 'react';
import { handleInitialData } from './Redux/Acctions/shared';
import { connect } from 'react-redux';
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return <div className="App">app</div>;
  }
}

export default connect()(App);
