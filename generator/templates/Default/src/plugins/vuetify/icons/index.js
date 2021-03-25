import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vuetifyIcons from './vuetify.js';
import kingscodeIcons from './kingscode.js';
import applicationIcons from './application.js';

const icons = [
  ...vuetifyIcons.icons,
  ...kingscodeIcons.icons,
  ...applicationIcons.icons,
];
library.add(...icons);

const identifiers = {
  ...vuetifyIcons.identifiers,
  ...kingscodeIcons.identifiers,
  ...applicationIcons.identifiers,
};

export default {
  values: Object.fromEntries(
    Object.entries(identifiers).map(
      ([key, icon]) => [key, {
        component: FontAwesomeIcon,
        props: { icon },
      }],
    ),
  ),
};
