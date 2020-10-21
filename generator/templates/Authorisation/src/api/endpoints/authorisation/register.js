import { post } from '../../implementation/app';

function verify(token, email, password, passwordConfirmation) {
  return post('registration/verify', {
    token,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
}

function acceptInvitation(email, token, password, passwordConfirmation) {
  return post('invitation/accept', {
    email: email,
    password: password,
    password_confirmation: passwordConfirmation,
    token: token,
  });
}

export {
  verify,
  acceptInvitation,
};
