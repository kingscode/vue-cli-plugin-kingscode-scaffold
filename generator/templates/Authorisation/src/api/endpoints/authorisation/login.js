import { post } from '../../implementation/app';

export default function (email, password) {
  return post('auth/login', {
    email: email,
    password: password,
  });
}
