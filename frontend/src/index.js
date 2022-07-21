import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import rootReducer from './modules';
import './styles/App.css';
import './styles/Nav.css';

const store = createStore(rootReducer);

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
