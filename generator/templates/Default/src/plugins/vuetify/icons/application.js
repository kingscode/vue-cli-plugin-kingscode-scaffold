import {
  faBox,
  faFolderTree
} from '<%_ if (options.plugins.includes("fontawesomepro")){ _%> @fortawesome/pro-solid-svg-icons<%_ } else { _%> @fortawesome/free-solid-svg-icons<%_ } _%>';

const icons = [
 faBox,
  faFolderTree
];

/*project specific icons*/
const identifiers = {
  product: ['fas', 'box'],
  productCategories: ['fas', 'folder-tree']
};

export default {
  icons,
  identifiers,
};
