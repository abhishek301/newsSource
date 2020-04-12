import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the headlines state domain
 */

const selectHeadlinesDomain = state => state.headlines || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Headlines
 */

const makeSelectHeadlines = () =>
  createSelector(
    selectHeadlinesDomain,
    substate => substate,
  );

export default makeSelectHeadlines;
export { selectHeadlinesDomain };
