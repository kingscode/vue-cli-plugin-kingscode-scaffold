import {post} from '../../implementation/app/wrapper.js';

export default function (email) {
    return post('password/forgotten', {
        email: email,
    });
}
