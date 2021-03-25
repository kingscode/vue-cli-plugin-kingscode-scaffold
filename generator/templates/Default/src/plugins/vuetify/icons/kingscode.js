import {
  faHome,
  faSearch,
  faUser,
  faUsers,
  faEye,
  faEyeSlash,
  faFile,
  faFileVideo,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faFilePdf,
  faUpload,
} from '<%_ if (options.plugins.includes("fontawesomepro")){ _%> @fortawesome/pro-solid-svg-icons<%_ } else { _%> @fortawesome/free-solid-svg-icons<%_ } _%>';

const icons = [
  faHome,
  faSearch,
  faUser,
  faUsers,
  faEye,
  faEyeSlash,
  faFile,
  faFileVideo,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faFilePdf,
  faUpload,
];

/*kingscode icons*/
const identifiers = {
  home: ['fas', 'home'],
  profile: ['fas', 'user'],
  search: ['fas', 'search'],
  upload: ['fas', 'upload'],

  user: ['fas', 'user'],
  users: ['fas', 'users'],
  visible: ['fas', 'eye'],
  invisible: ['fas', 'eye-slash'],
  fileUnknown: ['fas', 'file'],
  fileVideo: ['fas', 'file-video'],
  fileWord: ['fas', 'file-word'],
  fileExcel: ['fas', 'file-excel'],
  filePowerpoint: ['fas', 'file-powerpoint'],
  filePdf: ['fas', 'file-pdf'],
};

export default {
  icons,
  identifiers,
};
