import i18n from '@/plugins/i18n.js';

function translateField(field, translationPrefix) {
  if (translationPrefix) {
    const translationKey = `${translationPrefix}.${field}`;
    if (translationPrefix && i18n.te(translationKey)) {
      return i18n.t(translationKey);
    }

    if (i18n.te(field)) {
      return i18n.t(field);
    }

    return i18n.t(translationKey);
  }
}

export {
  translateField,
};
