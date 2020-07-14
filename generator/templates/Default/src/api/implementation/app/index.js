import axios from 'axios';

import {onRequestFulFilled, onRequestRejected, onResponseFulFilled, onResponseRejected} from './interceptor';
import {getPaginated} from './wrapper';

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

const get = axios.get;
const post = axios.post;
const destroy = axios.delete;
const put = axios.put;

export {
    getPaginated,
    get,
    post,
    destroy,
    put,
};

export default instance;
