import Vue from 'vue';
import VueI18n from 'vue-i18n';

const locales = { nl: require.context('@/locales/nl', true, /[A-Za-z0-9-_,\s]+\.json$/i) };
Vue.use(VueI18n);

function loadLocaleMessages() {
  const messages = {};
  Object.keys(locales).forEach((locale) => {
    messages[locale] = {};
    const components = locales[locale];

    components.keys().forEach(component => {
      const matched = component.match(/([A-Za-z0-9-_]+)\./i);
      const componentName = matched[1];
      messages[locale][componentName] = components(component);
    });
  });
  return messages;
}

export default new VueI18n({
  locale: 'nl' || navigator.language.split('-')[0],
  fallbackLocale: 'nl',
  messages: loadLocaleMessages(),
});
