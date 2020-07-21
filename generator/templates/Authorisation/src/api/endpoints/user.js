import axios, {getPaginated} from '../implementation/app';

function index(page, perPage, search, sortBy, descending, params) {
    return getPaginated('user', page, perPage, search, sortBy, descending, params);
}

/**
 * @param id {number}
 */
function show(id) {
    return axios.get(`user/${id}`);
}

/**
 * @param user {User}
 */
function create(user) {
    return axios.post('user', user);
}

/**
 * @param user {User}
 */
function update(user) {
    return axios.put(`user/${user.id}`, user);
}

/**
 * @param userId {number}
 */
function destroy(userId) {
    return axios.delete(`user/${userId}`);
}

export {
    index,
    show,
    create,
    update,
    destroy,
};
