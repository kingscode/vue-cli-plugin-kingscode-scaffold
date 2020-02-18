import API from './../../API.js';
import handleTooManyRequestsError from '../utils/handleTooManyRequestsError.js';

export default async function (email, token, password, passwordConfirmation) {
    const result = await API.post('registration', {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation
    }).catch((error) => error.response);

    if (result.status === 200) {
        return {
            success: true,
            message: 'Uw wachtwoord is opnieuw ingesteld.',
        };
    }

    if (result.status === 400) {
        return {
            success: false,
            message: 'De ingegeven token is verlopen.',
        }
    }

    if (result.status === 429) {
        return handleTooManyRequestsError(result);
    }

    return {
        message: 'De ingevulde gegevens kloppen niet.',
        success: false,
    };
}
