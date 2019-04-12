import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore'
import HomePage from './containers/HomePage'

const store = configureStore();
const MOUNT_NODE = document.getElementById('app');

/*
Main entry point of application.
*/
ReactDOM.render(
  <Provider store={store}>
    <HomePage />
  </Provider>,
MOUNT_NODE);
