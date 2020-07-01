import {post} from '../../implementation/app/wrapper.js';

export default function () {
    return post('auth/logout');
}

