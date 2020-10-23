import { post } from '@/api/implementation/app';

export default function (email) {
  return post('password/forgotten', {
    email,
  });
}
