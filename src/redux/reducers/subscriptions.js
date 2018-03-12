import { fromJS } from 'immutable';

const initialState = {
  categories: [],
};

const getCategories = () => (dispatch, getState) => {
  const token = getState().user.get('token');

  return dispatch({
    type: 'GET_CATEGORIES',
    requestCfg: {
      url: '/storage/v3/backend/api/execute/backend2/profileGetNewsCategories',
      method: 'POST',
      json: true,
      headers: {
        'X-MP-APPLICATION-GROUP-ID': '1',
        'X-MP-APPLICATION-ID': '13',
        'X-MP-USER-TOKEN': token,
      },
      data: {},
    },
  });
};

const setCategories = currentCategories => (dispatch, getState) => {
  const changedCategories = [];

  const categories = getState().subscriptions.get('categories').toJS().map((category) => {
    const currentCategoryId = Object.keys(currentCategories).find(categoryId => categoryId === category.Id);
    const currentSigned = currentCategories[currentCategoryId].toString();

    if(category.signed !== currentSigned) {
      category.signed = currentSigned;
      changedCategories.push(category);
    }

    return category;
  });

  dispatch({
    type: 'SET_CATEGORIES',
    payload: { categories },
  });

  return dispatch(saveCategories(changedCategories));
};

const saveCategories = changedCategories => (dispatch /* , getState */) => {
  changedCategories.forEach(category => dispatch(saveCategory(category)));
};

const saveCategory = category => (dispatch, getState) => {
  const token = getState().user.get('token');

  return dispatch({
    type: 'SAVE_CATEGORY',
    requestCfg: {
      url: '/storage/v3/backend/api/execute/backend2/profileSaveNewsCategories',
      method: 'POST',
      json: true,
      headers: {
        'X-MP-APPLICATION-GROUP-ID': '1',
        'X-MP-APPLICATION-ID': '13',
        'X-MP-USER-TOKEN': token,
      },
      data: category,
    },
  });
};

const clearCategories = () => (dispatch, getState) => {
  const categories = getState().subscriptions.get('categories').toJS();
  const currentCategories = {};

  categories.forEach((category) => {
    currentCategories[category.Id] = false;
  });

  return dispatch(setCategories(currentCategories));
};

export const actionCreators = {
  getCategories,
  setCategories,
  saveCategories,
  clearCategories,
};

const ACTION_HANDLERS = {
  GET_CATEGORIES_SUCCESS: (state, action) => state.set('categories', fromJS(action.response.data)),
  SET_CATEGORIES: (state, action) => state.set('categories', fromJS(action.payload.categories)),
  SAVE_CATEGORY_SUCCESS: state => state,
};

export default (state = fromJS(initialState), action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
