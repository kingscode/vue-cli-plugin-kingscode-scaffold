import { post } from '../../implementation/app';

export default function () {
  return post('auth/logout');
}

