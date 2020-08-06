import { post } from '../../implementation/app';

export default function (email) {
  return post('password/forgotten', {
    email: email,
  });
}
