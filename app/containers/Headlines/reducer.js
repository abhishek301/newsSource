/*
 *
 * Headlines reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_HEADLINES,
  HEADLINES_SUCCESS,
  HEADLINES_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  data: null,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const headlinesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_HEADLINES:
        draft.loading = true;
        break;
      case HEADLINES_SUCCESS:
        draft.loading = false;
        draft.data = action.payload.articles;
        break;
      case HEADLINES_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default headlinesReducer;
