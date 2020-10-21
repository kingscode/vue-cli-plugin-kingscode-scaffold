import { post } from '../../implementation/app';

function passwordForgotten(email) {
  return post('password/forgotten', {
    email,
  });
}

function passwordReset(token, email, password, passwordConfirmation) {
  return post('password/reset', {
    token,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
}

export {
  passwordForgotten,
  passwordReset,
};
