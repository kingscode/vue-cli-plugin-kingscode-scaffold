import axios from 'axios';

import {onRequestFulFilled, onRequestRejected, onResponseFulFilled, onResponseRejected} from './interceptor';
import {getPaginated} from './wrapper';
import {transformParams, transformRequest, transformResponse} from './transformer';

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
    transformRequest: [transformRequest],
    transformResponse: [transformResponse],
    paramsSerializer: transformParams,
};

const instance = axios.create(config);

instance.interceptors.request.use(onRequestFulFilled, onRequestRejected);
instance.interceptors.response.use(onResponseFulFilled, onResponseRejected);

const get = instance.get;
const post = instance.post;
const destroy = instance.delete;
const put = instance.put;

export {
    getPaginated,
    get,
    post,
    destroy,
    put,
};

export default instance;
