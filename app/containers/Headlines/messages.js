/*
 * Headlines Messages
 *
 * This contains all the text for the Headlines container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Headlines';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Headlines container!',
  },
});
