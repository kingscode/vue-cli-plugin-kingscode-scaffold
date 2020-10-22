import { post } from '@/api/implementation/app';

export default async function (email, token, password, passwordConfirmation) {
  return post('password/reset', {
    email,
    token,
    password,
    passwordConfirmation,
  });
}
