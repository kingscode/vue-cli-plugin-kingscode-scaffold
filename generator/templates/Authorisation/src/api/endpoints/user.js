import axios from '../implementation/app';

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
    return axios.destroy(`user/${userId}`);
}

export {
    create,
    update,
    destroy,
};