import { fromJS } from 'immutable';


const showModal = (opts = {}) => dispatch =>
  dispatch({
    type: 'SHOW_MODAL',
    payload: opts,
  });

const hideModal = forse => dispatch =>
  dispatch({
    type: 'HIDE_MODAL',
    payload: { forse },
  });

export const actionCreators = {
  showModal,
  hideModal,
};

const ACTION_HANDLERS = {
  SHOW_MODAL: (state, action) => {
    const modalChildrens = state.get('modalChildrens').push(action.payload);
    return state.set('modalChildrens', modalChildrens);
  },
  HIDE_MODAL: (state, action) => {
    const { force } = action.payload;
    if(force) {
      return initialState;
    }
    const modalChildrens = state.get('modalChildrens').pop();
    return state.set('modalChildrens', modalChildrens);
  },
};

const initialState = fromJS({
  modalChildrens: [],
});

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
