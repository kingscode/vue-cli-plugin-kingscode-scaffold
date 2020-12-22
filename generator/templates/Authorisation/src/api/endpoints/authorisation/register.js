import { post } from '../../implementation/app';

function verify(token, email, password, passwordConfirmation) {
  return post('registration/verify', {
    token,
    email,
    password,
    passwordConfirmation,
  });
}

function acceptInvitation(email, token, password, passwordConfirmation) {
  return post('invitation/accept', {
    email,
    password,
    passwordConfirmation,
    token,
  });
}

function resendInvitation(email) {
  return post('invitation/resend', {
    email,
  });
}

export {
  verify,
  acceptInvitation,
  resendInvitation,
};
