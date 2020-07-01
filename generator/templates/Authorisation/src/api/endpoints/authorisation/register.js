import {post} from '../../implementation/app/wrapper.js';

export default function (email, name) {
    return post('registration', {
        email, name,
    });
}
