import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../src/style/css/main.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Redux/Reducers';
import middleware from './Redux/Middlewares';

const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
