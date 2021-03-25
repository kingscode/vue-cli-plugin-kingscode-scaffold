import {
  faMinus,
  faPlus,
  faPaperclip,
  faArrowsAltV,
  faStepForward,
  faStepBackward,
  faSync,
  faStar,
  faStarHalf,
  faPencilAlt,
  faCircle,
  faDotCircle,
  faCaretDown,
  faBars,
  faChevronDown,
  faSortUp,
  faMinusSquare,
  faSquare,
  faCheckSquare,
  faChevronRight,
  faChevronLeft,
  faExclamationTriangle,
  faExclamation,
  faInfoCircle,
  faCheckCircle,
  faTimes,
  faCheck,
} from '<%_ if (options.plugins.includes("fontawesomepro")){ _%> @fortawesome/pro-solid-svg-icons<%_ } else { _%> @fortawesome/free-solid-svg-icons<%_ } _%>';

const icons = [
  faMinus,
  faPlus,
  faPaperclip,
  faArrowsAltV,
  faStepForward,
  faStepBackward,
  faSync,
  faStar,
  faStarHalf,
  faPencilAlt,
  faCircle,
  faDotCircle,
  faCaretDown,
  faBars,
  faChevronDown,
  faSortUp,
  faMinusSquare,
  faSquare,
  faCheckSquare,
  faChevronRight,
  faChevronLeft,
  faExclamationTriangle,
  faExclamation,
  faInfoCircle,
  faCheckCircle,
  faTimes,
  faCheck
];

/*vuetify default icons*/
const identifiers = {
  complete: ['fas', 'check'],
  cancel: ['fas', 'times'],
  close: ['fas', 'times'],
  delete: ['fas', 'times'],
  clear: ['fas', 'times'],
  success: ['fas', 'check-circle'],
  info: ['fas', 'info-circle'],
  warning: ['fas', 'exclamation'],
  error: ['fas', 'exclamation-triangle'],
  prev: ['fas', 'chevron-left'],
  next: ['fas', 'chevron-right'],
  checkboxOn: ['fas', 'check-square'],
  checkboxOff: ['fas', 'square'],
  checkboxIndeterminate: ['fas', 'minus-square'],
  delimiter: ['fas', 'circle'],
  sort: ['fas', 'sort-up'],
  expand: ['fas', 'chevron-down'],
  menu: ['fas', 'bars'],
  subgroup: ['fas', 'caret-down'],
  dropdown: ['fas', 'caret-down'],
  radioOn: ['fas', 'dot-circle'],
  radioOff: ['fas', 'circle'],
  edit: ['fas', 'pencil-alt'],
  ratingEmpty: ['fas', 'star'],
  ratingFull: ['fas', 'star'],
  ratingHalf: ['fas', 'star-half'],
  loading: ['fas', 'sync'],
  first: ['fas', 'step-backward'],
  last: ['fas', 'step-forward'],
  unfold: ['fas', 'arrows-alt-v'],
  file: ['fas', 'paperclip'],
  plus: ['fas', 'plus'],
  minus: ['fas', 'minus'],
};

export default { icons, identifiers, };
