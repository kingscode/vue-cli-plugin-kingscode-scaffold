import {post} from '../../implementation/app';

export default function (email, name) {
    return post('registration', {
        email, name,
    });
}
