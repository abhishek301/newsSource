/**
 *
 * Asynchronously loads the component for NewsItem
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
