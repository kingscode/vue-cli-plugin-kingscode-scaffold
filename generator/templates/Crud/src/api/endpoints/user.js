import { getPaginated } from '@/api/implementation/app/wrapper.js';
import { destroy, get, post, put } from '@/api/implementation/app';

function index(page, perPage, search, sortBy, descending, params) {
  return getPaginated('user', page, perPage, search, sortBy, descending, params);
}

function show(id) {
  return get(`user/${id}`);
}

function create(user) {
  return post('user', user);
}

function update(user) {
  return put(`user/${user.id}`, user);
}

function remove(userId) {
  return destroy(`user/${userId}`);
}

export {
  index,
  show,
  create,
  update,
  remove,
};
