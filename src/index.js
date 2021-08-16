import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../src/style/css/main.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Redux/Reducers';
import middleware from './Redux/Middlewares';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(middleware));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
