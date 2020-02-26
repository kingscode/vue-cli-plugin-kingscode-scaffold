// Dependencies
import axios from 'axios';
import router from './router';
import qs from 'qs';
<%_ if (options.useAuthorisation) { _%>
import store from './store';
<%_ } _%>
/**
 * Instantiate promise based HTTP client for the browser and node.js
 *
 * @see https://github.com/mzabriskie/axios
 * @type {AxiosInstance}
 */
let instance = axios.create({
        baseURL: process.env.VUE_APP_ROOT_API,
        headers: {
            Accept: 'application/json',
        },
        validateStatus: function (status) {
            return status >= 200 && status < 300; // default
        }, paramsSerializer: function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat', encode: false});
        },
    })
;

// Global network/api errors
let retry = 0;
var evt = document.createEvent('HTMLEvents');
evt.initEvent('noApiConnection', true, true);

/**
 * Response interceptor.
 */
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Do something with response error
        if (error.response) {
            switch (error.response.status) {

                <%_ if (options.useAuthorisation) { _%>
                case 401:
                    store.dispatch('Authorisation/unauthorized');
                    break;
                <%_ } _%>
                case 403:
                    router.push({
                        name: '403',
                    });
                    break;
            }
        } else {
            if (error.request) {

                // Api offline but device online
                if (retry < 3 && navigator.onLine === true) {
                    retry++;

                    setTimeout(() => {
                        return instance(error.config);
                    }, 500 * retry);
                } else {
                    if (navigator.onLine === true) {
                        retry = 0;
                        document.dispatchEvent(evt);
                    }
                }
            } else {
                alert('Er ging iets mis bij het versturen van een verzoek naar de server, neem aub contact op met ons');
            }
        }

        return Promise.reject(error);
    },
);

<%_ if (options.useAuthorisation) { _%>
/**
 * Request interceptor that catches the request and injects the token into the Authorisation header.
 */
instance.interceptors.request.use((request) => {
    if(store.getters['Authorisation/isLoggedIn']) {
        let token = store.getters['Authorisation/getAccessToken'];
        request.headers.Authorization = 'Bearer ' + token;
    }

    return request;
});

<%_ } _%>

/**
 * Request interceptor that fixes PUT requests for php. >> https://bugs.php.net/bug.php?id=55815
 */
instance.interceptors.request.use((request) => {
    if (request.method === 'put' && request.data instanceof FormData) {
        request.method = 'post';
        request.data.append('_method', 'put');
    }

    return request;
});

export default instance;
