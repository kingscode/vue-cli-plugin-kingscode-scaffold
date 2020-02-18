import API from './../../API.js';

export default async function logout() {
    await API.post('auth/logout').catch((error) => {
        return error.response;
    });
    return {
        success: true,
    };
}

