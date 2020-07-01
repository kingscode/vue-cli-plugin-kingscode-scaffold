import {post} from '../../implementation/app/wrapper';

export default function (email, password) {
    return post('auth/login', {
        email: email,
        password: password,
    });
}
