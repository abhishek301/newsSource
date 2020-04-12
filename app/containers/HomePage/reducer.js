/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import { REQUEST_NEWSSOURCE } from './constants';

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
    }
  });

export default homePageReducer;
