import store from '../store';

export default function (to, from, next) {
  if (!store.getters['authorisation/isLoggedIn']) {
    next({
      name: 'login',
    });
    return;
  }
  next();
}
