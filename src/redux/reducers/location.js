import browserHistory from 'react-router/lib/browserHistory';


export const locationChange = (location = '/') => ({
  type: 'LOCATION_CHANGE',
  payload: location,
});

export const updateLocation = ({ dispatch }) => nextLocation => dispatch(locationChange(nextLocation));

const initialState = browserHistory.getCurrentLocation();
export default (state = initialState, action) => action.type === 'LOCATION_CHANGE'
  ? action.payload
  : state;
