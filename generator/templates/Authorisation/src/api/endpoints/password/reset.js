import {post} from '../../implementation/app/wrapper.js';

export default async function (email, token, password, passwordConfirmation) {
    return post('registration', {
        email: email,
        token: token,
        password: password,
        password_confirmation: passwordConfirmation
    });
}
