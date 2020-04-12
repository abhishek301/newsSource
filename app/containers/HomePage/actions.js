/*
 *
 * HomePage actions
 *
 */

import {
  REQUEST_NEWSSOURCE,
  NEWSSOURCE_SUCCESS,
  NEWSSOURCE_ERROR,
} from './constants';

export function requestNewsSource() {
  return {
    type: REQUEST_NEWSSOURCE,
  };
}
export function newsSourceSuccess(payload) {
  return {
    type: NEWSSOURCE_SUCCESS,
    payload,
  };
}
export function newsSourceError(error) {
  return {
    type: NEWSSOURCE_ERROR,
    error,
  };
}
