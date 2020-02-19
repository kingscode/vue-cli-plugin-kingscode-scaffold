import API from './../../API.js';
import handleTooManyRequestsError from '../utils/handleTooManyRequestsError.js';

export default async function (email) {
    const result = await API.post('password/forgotten', {
        email,
    }).catch((error) => {
        return error.response;
    });

    if (result.status === 200) {
        return {
            success: true,
            message: 'Er is een wachtwoord vergeten mail verstuurd mits er een account bestaat met het gegeven email adres.',
        };
    }

    if (result.status === 429) {
        return handleTooManyRequestsError(result);
    }

    return {
        message: 'De ingevulde gegevens kloppen niet.',
        success: false,
    };
}
