import axios from 'axios';

import {onRequestFulFilled, onRequestRejected, onResponseFulFilled, onResponseRejected} from './interceptor';
import {destroy, get, getPaginated, post, put} from './wrapper'

/**
 * Returns an axios instance
 * specifically made for app API calls.
 */

/**
 * @type {AxiosRequestConfig}
 */
const config = {
    baseURL: process.env.VUE_APP_ROOT_API,
    headers: {
        Accept: 'application/json',
    },
};

const instance = axios.create(config);

instance.interceptors.request.use(onRequestFulFilled, onRequestRejected);
instance.interceptors.response.use(onResponseFulFilled, onResponseRejected);

export {
    get,
    getPaginated,
    post,
    put,
    destroy,
}

export default instance;
