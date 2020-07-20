import {post} from '../../implementation/app';

function register(email, name) {
    return post('registration', {
        email, name,
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
