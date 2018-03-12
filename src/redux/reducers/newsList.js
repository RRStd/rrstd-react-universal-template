import { fromJS } from 'immutable';

import calcIdsDifference from 'helpers/calcIdsDifference';

import { actionCreators as newsActionCreators } from 'redux/reducers/news';

const initialState = {
  filter: {
    view: 'all',
    location: 'everywhere',
    categoriesIds: [
      '0',
    ],
  },
  page: 0,
  isNextPage: false,
  itemsIds: [],
};

const addItemsIds = itemsIds => dispatch => dispatch({
  type: 'ADD_ITEMS_IDS',
  payload: { itemsIds },
});

const resetItemsIds = itemsIds => dispatch => dispatch({
  type: 'RESET_ITEMS_IDS',
  payload: { itemsIds },
});

const setFilter = filter => (dispatch, getState) => {
  dispatch({
    type: 'SET_FILTER',
    payload: { filter },
  });
  dispatch(setIsNextPage(false));
  dispatch(setPage(0, {fetch: false}));
  return dispatch(newsActionCreators.getNews(true)).then((action) => {
    const { fetchedItemsIds } =
      calcIdsDifference(action.response.data, getState().newsList.get('itemsIds').toJS());
    dispatch(resetItemsIds(fetchedItemsIds));
    if(fetchedItemsIds.length >= 10) {
      dispatch(setIsNextPage(true));
    }
  });
};

const setPage = (page, opts = {}) => (dispatch, getState) => {
  dispatch({
    type: 'SET_PAGE',
    payload: { page },
  });
  if(opts.fetch) {
    return dispatch(newsActionCreators.getNews(true)).then((action) => {
      const { fetchedItemsIds } =
        calcIdsDifference(action.response.data, getState().newsList.get('itemsIds').toJS());
      dispatch(addItemsIds(fetchedItemsIds));
      return action;
    });
  }
  return undefined;
};

const setIsNextPage = isNextPage => (dispatch) => {
  dispatch({
    type: 'SET_IS_NEXT_PAGE',
    payload: { isNextPage },
  });
};

const clearFilter = () => (dispatch, getState) => {
  dispatch({
    type: 'CLEAR_FILTER',
  });
  return dispatch(newsActionCreators.getNews(true)).then((action) => {
    const { fetchedItemsIds } =
      calcIdsDifference(action.response.data, getState().newsList.get('itemsIds').toJS());
    dispatch(resetItemsIds(fetchedItemsIds));
  });
};

export const actionCreators = {
  setFilter,
  resetItemsIds,
  clearFilter,
  addItemsIds,
  setPage,
  setIsNextPage,
};

const ACTION_HANDLERS = {
  ADD_ITEMS_IDS: (state, action) => {
    const nextState = state.setIn(['itemsIds'], state.get('itemsIds').concat(fromJS(action.payload.itemsIds)));
    return nextState;
  },
  RESET_ITEMS_IDS: (state, action) => {
    const nextState = state.setIn(['itemsIds'], fromJS(action.payload.itemsIds));
    return nextState;
  },
  SET_PAGE: (state, action) => {
    const nextState = state.set('page', fromJS(action.payload.page));
    return nextState;
  },
  SET_FILTER: (state, action) => {
    const nextState = state.set('filter', fromJS(action.payload.filter));
    return nextState;
  },
  CLEAR_FILTER: (state /* , action */) => {
    const nextState = state.set('filter', fromJS(initialState.filter));
    return nextState;
  },
  SET_IS_NEXT_PAGE: (state, action) => state.set('isNextPage', action.payload.isNextPage),
};

export default (state = fromJS(initialState), action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
