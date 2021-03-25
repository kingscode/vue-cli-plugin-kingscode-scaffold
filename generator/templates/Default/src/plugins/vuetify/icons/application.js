import {
  faBox,
} from '<%_ if (options.plugins.includes("fontawesomepro")){ _%> @fortawesome/pro-solid-svg-icons<%_ } else { _%> @fortawesome/free-solid-svg-icons<%_ } _%>';

const icons = [
 faBox,
];

/*project specific icons*/
const identifiers = {
  product: ['fas', 'box'],
};

export default {
  icons,
  identifiers,
};
