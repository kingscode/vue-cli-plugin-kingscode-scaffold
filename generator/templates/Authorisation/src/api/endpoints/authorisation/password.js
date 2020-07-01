import {post} from '../../implementation/app/wrapper.js';

function passwordForgotten(email) {
    return post('password/forgotten', {
        email: email,
    });
}

function passwordReset(token, email, password, passwordConfirmation) {
    return post('password/reset', {
        token: token,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
    });
}

export {
    passwordForgotten,
    passwordReset,
};
