import { fromJS } from 'immutable';


const initialState = fromJS({
  items: {},
});

/*
const createGetNewsAction = (token, data = {}) => ({
  type: 'GET_NEWS',
  requestCfg: {
    url: '/storage/v3/backend/api/execute/backend/listNews',
    method: 'POST',
    json: true,
    headers: {
      'X-MP-APPLICATION-GROUP-ID': '1',
      'X-MP-APPLICATION-ID': '13',
      'X-MP-USER-TOKEN': token,
    },
    data,
  },
});

const getNews = () => (dispatch, getState) =>
new Promise( (resolve, reject) =>
  dispatch( createGetNewsAction( getState().user.get('token') ))
  .then( d => resolve(d) )
  .catch( d => reject(d) )
);
*/

const newsStub = [{
  id: 1,
  notify: true,
  read: false,
  publishDate: `${ new Date() }`,
  title: 'title 1',
  text: 'text 1',
}, {
  id: 2,
  publishDate: `${ new Date() }`,
  categoryName: 'category',
  title: 'title 2',
  text: 'text 2',
}];

const getNewsActionStub = {
  type: 'GET_NEWS_SUCCESS',
  response: {
    data: newsStub,
  },
};

const getNews = () => dispatch =>
new Promise( (resolve /* , reject */) => {
  setTimeout( () => {
    dispatch( getNewsActionStub );
    resolve( getNewsActionStub );
  }, 1000);
});


/*
const createGetArticleAction = (token, articleId) => ({
  type: 'GET_ARTICLE',
  requestCfg: {
    url: '/storage/v3/backend/api/execute/backend2/getNewsById',
    method: 'POST',
    json: true,
    headers: {
      'X-MP-APPLICATION-GROUP-ID': '1',
      'X-MP-APPLICATION-ID': '13',
      'X-MP-USER-TOKEN': token,
    },
    data: { id: +articleId },
  },
});

const getArticle = (articleId) => (dispatch, getState) => {
  const token = getState().user.get('token');
  return dispatch( createGetArticleAction(token, articleId) );
};
*/

const getArticle = articleId => dispatch =>
new Promise( (resolve /* , reject */) => {
  const getArticleActionStub = {
    type: 'GET_ARTICLE_SUCCESS',
    response: {
      data: [{
        newsElement: newsStub[+articleId - 1],
      }],
    },
  };

  setTimeout( () => {
    dispatch( getArticleActionStub );
    resolve( getArticleActionStub );
  }, 1000);
});


export const actionCreators = {
  getNews,
  getArticle,
};

const ACTION_HANDLERS = {
  GET_NEWS_SUCCESS: (state, action) => {
    let nextState = state;
    action.response.data.forEach((el) => {
      nextState = nextState.setIn(['items', el.id], fromJS(el));
    });
    return nextState;
  },
  GET_ARTICLE_SUCCESS: (state, action) => state.setIn(['items', action.response.data[0].newsElement.id],
      fromJS({...action.response.data[0].newsElement})),
};


export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
