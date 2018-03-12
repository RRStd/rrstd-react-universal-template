import { fromJS } from 'immutable';

const initialState = {
  itemsIds: [],
};

const addItemsIds = itemsIds => dispatch => dispatch({
  type: 'ADD_INBOX_INMAIL_ITEMS_IDS',
  payload: { itemsIds },
});

const resetItemsIds = itemsIds => dispatch => dispatch({
  type: 'RESET_INBOX_INMAIL_ITEMS_IDS',
  payload: { itemsIds },
});

export const actionCreators = {
  resetItemsIds,
  addItemsIds,
};

const ACTION_HANDLERS = {
  ADD_INBOX_INMAIL_ITEMS_IDS: (state, action) => {
    const nextState = state.setIn(['itemsIds'], state.get('itemsIds').concat(fromJS(action.payload.itemsIds)));
    return nextState;
  },
  RESET_INBOX_INMAIL_ITEMS_IDS: (state, action) => {
    const nextState = state.setIn(['itemsIds'], fromJS(action.payload.itemsIds));
    return nextState;
  },
};

export default (state = fromJS(initialState), action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
