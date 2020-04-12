import axios from 'axios';
import { assign, isEmpty } from 'lodash';

import {
  errorMessage500,
  emptyResponseErrorMessage,
  authTokenKey,
} from './constants';

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
const checkStatus = response => {
  if (isEmpty(response)) {
    const error = new Error(emptyResponseErrorMessage);
    throw error;
  }
  // send response if >= 200 or < 300
  // also send response incase of unauthorised 401. Ex: Username and password do not match
  if (
    response.status === 401 ||
    (response.status >= 200 && response.status < 300)
  ) {
    return response;
  }
  if (response.status === 500) {
    const error = new Error(response.statusText);
    error.response = {
      data: {
        errors: [{ message: errorMessage500 }],
      },
    };
    throw error;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const getHeaders = ({ headers = {}, authToken = false }) => {
  // if auth is required, include auth token in headers
  if (authToken) {
    const token = window.localStorage.getItem(authTokenKey);
    return assign({}, headers, { Authorization: `Bearer ${token}` });
  }
  return headers;
};

/**
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "axios"
 *
 * @return {object}           The response
 */
export default function request(url, options = {}) {
  return axios({
    method: options.method || 'get',
    headers: getHeaders(options),
    url,
    data: options.data,
  })
    .then(checkStatus)
    .catch(err => checkStatus(err.response));
}
