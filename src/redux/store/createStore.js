import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import callAPIMiddleware from 'redux/middlewares/callApi';

import makeRootReducer from './reducers';
import { updateLocation } from '../reducers/location';

const createStore = (initialState = {}) => {
  // const middleware = [thunk, callAPIMiddleware, createLogger];
  const middleware = [thunk, callAPIMiddleware];
  const enhancers = [];
  let composeEnhancers = compose;

  if(__DEV__) {
    /* eslint-disable no-underscore-dangle */
    if(typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
    /* eslint-enable no-underscore-dangle */
  }

  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );
  store.asyncReducers = {};

  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if(module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

export default createStore;
