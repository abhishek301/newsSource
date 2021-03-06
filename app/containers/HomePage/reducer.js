/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  REQUEST_NEWSSOURCE,
  NEWSSOURCE_SUCCESS,
  NEWSSOURCE_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  data: null,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_NEWSSOURCE:
        draft.loading = true;
        break;
      case NEWSSOURCE_SUCCESS:
        draft.loading = false;
        draft.data = action.payload.sources;
        break;
      case NEWSSOURCE_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default homePageReducer;
