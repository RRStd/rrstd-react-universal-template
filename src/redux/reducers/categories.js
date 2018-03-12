import { fromJS } from 'immutable';

const initialState = {
  items: [],
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

export const actionCreators = {
  getCategories,
};

const ACTION_HANDLERS = {
  GET_CATEGORIES_SUCCESS: (state, action) => {
    const nextState = state.set('items', fromJS(action.response.data));
    return nextState;
  },
};

export default (state = fromJS(initialState), action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
