import axios from 'axios';
import { apiRoot } from '../../../project.config';


const callAPI = ({ dispatch, getState }) => next => (action) => {
  const {
    type,
    requestCfg,
    shouldCallAPI = () => true,
    payload = {},
  } = action;

  if(!requestCfg) {
    return next(action);
  }

  if(!shouldCallAPI(getState())) {
    return false;
  }

  const typeRequest = `${ type }_REQUEST`;
  const typeSuccess = `${ type }_SUCCESS`;
  const typeFail = `${ type }_FAIL`;

  dispatch({
    type: typeRequest,
    payload,
  });
  return new Promise((resolve, reject) => {
    axios({
      ...requestCfg,
      url: requestCfg.fullUrl ? requestCfg.fullUrl : `${ apiRoot }${ requestCfg.url }`,
    }).then((response) => {
      dispatch({
        type: typeSuccess,
        payload,
        response,
      });
      return resolve({
        type: typeSuccess,
        payload,
        response,
      });
    }).catch((error) => {
      dispatch({
        type: typeFail,
        payload,
        error,
      });
      return reject({
        type: typeSuccess,
        payload,
        error,
      });
    });
  });
};

export default callAPI;
