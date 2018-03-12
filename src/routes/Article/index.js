import React from 'react';
import Page from 'components/Page';

import { actionCreators as newsActionCreators } from 'redux/reducers/news';

import Article from './containers/Article';


export default store => ({
  path: '/news/article/:id',
  onEnter: (nextState, replace, callback) => {
    store.dispatch( newsActionCreators.getArticle(nextState.params.id) );
    callback();
  },
  component: state => (
    <Page
      backUrl='/news'
      title='News'
      content={<Article articleId={state.routeParams.id} />}
    />
  ),
});
