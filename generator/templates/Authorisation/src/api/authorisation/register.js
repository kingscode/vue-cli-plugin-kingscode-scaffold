import API from './../../API.js';
import handleTooManyRequestsError from '../utils/handleTooManyRequestsError.js';

export default async function (email, name) {
    const result = await API.post('registration', {
        email, name,
    }).catch((error) => {
        return error.response;
    });

    if (result.status === 201) {
        return {
            success: true,
            message: 'Er is een account aangemaakt, controleer je e-mail om een wachtwoord te kiezen zodat je vervolgens kunt inloggen.',
        };
    }

    if (result.status === 429) {
        return handleTooManyRequestsError(result);
    }

    return {
        message: `De ingevulde gegevens kloppen niet.`,
        success: false,
    };
}
