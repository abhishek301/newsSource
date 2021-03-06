/*
 * Article Messages
 *
 * This contains all the text for the Article component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Article';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Article component!',
  },
});
