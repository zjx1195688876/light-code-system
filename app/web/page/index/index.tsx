
import React, { Component, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Layout from '../../framework/layout';
// https://github.com/gaearon/react-hot-loader/issues/525
import Page from './views/Page';
import './index.css';

class App extends Component<any> {
  render() {
    return <Layout {...this.props}><Page /></Layout>;
  }
}

function bootstrap() {
  if (EASY_ENV_IS_NODE) {
    return App;
  }
  const root = document.getElementById('app');
  if (EASY_ENV_IS_DEV) {
    ReactDOM.hydrate(<AppContainer><Page /></AppContainer>, root);
    if (module.hot) {
      module.hot.accept();
    }
  }
  ReactDOM.hydrate(<Page />, root);
}

export default bootstrap();
