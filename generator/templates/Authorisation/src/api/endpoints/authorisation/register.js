import {post} from '../../implementation/app';

function register(email, name, code) {
    return post('registration', {
        email, name, code,
    });
}

function verify(token, email, password, passwordConfirmation) {
    return post('registration/verify', {
        token: token,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
    });
}

export {
    register,
    verify,
};
