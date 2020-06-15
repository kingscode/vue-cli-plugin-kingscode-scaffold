import store from '../../../store';

/**
 * @param request {AxiosRequestConfig}
 */
function onRequestFulFilled(request) {
    return request;
}

/**
 * @param error {AxiosError}
 */
function onRequestRejected(error) {
    return error;
}

/**
 * @param response {AxiosResponse}
 */
function onResponseFulFilled(response) {
    return response;
}

/**
 * @param error {AxiosError}
 */
function onResponseRejected(error) {

    if (typeof error === 'string' || !error.response) return Promise.reject(error);

    const status = error.response.status;

    const data = error.response.data;
    /* Now we know there was an error during submitting */
    if (data.errors && status === 422) {
        /* For now, all errors will be removed on route change
        *  We might need to add global errors later on */
        Object.keys(data.errors).forEach(key => store.commit('Error/add', {
            key: key,
            message: data.errors[key][0],
        }));
    }

    return Promise.reject(error.response);
}

export {
    onRequestFulFilled,
    onRequestRejected,
    onResponseFulFilled,
    onResponseRejected,
};
