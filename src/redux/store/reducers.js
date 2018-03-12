import { combineReducers } from 'redux';

import location from '../reducers/location';
import modals from '../reducers/modals';
import news from '../reducers/news';
import newsList from '../reducers/newsList';
import newsCategories from '../reducers/newsCategories';
import subscriptions from '../reducers/subscriptions';


const makeRootReducer = asyncReducers => combineReducers({
  location,
  modals,
  news,
  newsList,
  newsCategories,
  subscriptions,
  ...asyncReducers,
});

export const injectReducer = (store, { key, reducer }) => {
  if(Object.hasOwnProperty.call(store.asyncReducers, key)) return;
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
