import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';
import { fromJS } from 'immutable';

import createStore from 'redux/store/createStore';
import App from './components/App';
import routes from './routes/index';

import './styles/main';

// eslint-disable-next-line no-underscore-dangle
const initialState = Object.assign({}, window.__INITIAL_STATE__);
Object.keys(initialState).forEach((key) => { initialState[key] = fromJS(initialState[key]); });

const store = createStore(initialState);
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <App store={store} routes={routes(store)} />,
    MOUNT_NODE,
  );
};

const startRender = () => {
  if(__DEV__) {
    if(module.hot) {
      const renderApp = render;
      const renderError = (error) => {
        ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
      };
      render = () => {
        try {
          renderApp();
        } catch (e) {
          console.error(e);
          renderError(e);
        }
      };
      module.hot.accept([
        './components/App',
        './routes/index',
      ], () =>
        setImmediate(() => {
          ReactDOM.unmountComponentAtNode(MOUNT_NODE);
          render();
        }),
      );
    }
  }

  if( !__TEST__ ) {
    render();
  }
};

startRender();
