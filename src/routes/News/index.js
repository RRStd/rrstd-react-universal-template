import React from 'react';
import Page from 'components/Page';

import calcIdsDifference from 'helpers/calcIdsDifference';

import { actionCreators as newsActionCreators } from 'redux/reducers/news';
import { actionCreators as newsListActionCreators } from 'redux/reducers/newsList';

import NewsList from 'containers/NewsList';

import NewsPageToolbar from './containers/NewsPageToolbar';


const NewsPage = (
  <Page
    title='News'
    toolbar={<NewsPageToolbar />}
    content={<NewsList />}
  />
);

export default store => ({
  path: 'news',
  component: () => NewsPage,
  onEnter: (nextState, replace, callback) => {
    store.dispatch( newsActionCreators.getNews(true) )
    .then( (action) => {
      const { fetchedItemsIds } = calcIdsDifference(
        action.response.data,
        store.getState().newsList.get('itemsIds').toJS(),
      );
      store.dispatch( newsListActionCreators.resetItemsIds(fetchedItemsIds) );
      callback();
    });
  },
});
