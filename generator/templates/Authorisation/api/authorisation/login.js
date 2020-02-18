import API from './../../API.js';
import handleTooManyRequestsError from '../utils/handleTooManyRequestsError.js';

export default async function login(email, password) {
    const result = await API.post('auth/login', {
        email, password,
    }).catch((error) => {
        return error.response;
    });

    if (result.status === 200) {
        return {
            success: true,
            token: result.data.data.token,
        };
    }

    if (result.status === 429) {
        return handleTooManyRequestsError(result);
    }

    return {
        message: 'De ingevulde gegevens zijn niet juist.',
        success: false,
    };
}
