/*
 *
 * Headlines actions
 *
 */

import {
  REQUEST_HEADLINES,
  HEADLINES_SUCCESS,
  HEADLINES_ERROR,
} from './constants';

export function requestHeadlines(params) {
  return {
    type: REQUEST_HEADLINES,
    params,
  };
}
export function headlinesSuccess(payload) {
  return {
    type: HEADLINES_SUCCESS,
    payload,
  };
}
export function headlinesError(error) {
  return {
    type: HEADLINES_ERROR,
    error,
  };
}
