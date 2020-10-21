import router from '@/router';
import store from '@/store';

/**
 * @param request {AxiosRequestConfig}
 */
function onRequestFulFilled(request) {
  if (request.method === 'put') {
    request.method = 'post';
    if (request.data instanceof FormData) {
      request.data.append('_method', 'put');
    } else {
      request.data._method = 'put';
    }
  }

  const computedHeaders = computeHeaders();

  Object.keys(computedHeaders)
    .forEach((header) => {
      Object.assign(request.headers.common, {
        [header]: computedHeaders[header],
      });
    });

  return request;
}

function computeHeaders() {
  return {
    Authorization: store.getters['authorisation/isLoggedIn']
      ? `Bearer ${store.state.authorisation.token}`
      : undefined,
  };
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
  const { response } = error;

  if (!response) return Promise.reject(error); // network error, not axios related

  const { status } = response;
  const { errors } = response.data;

  if (status === 401) {
    store.dispatch('authorisation/logout');
    router.push({ name: 'login' });
    return;
  } else if (status === 403) {
    router.push({ name: '403' });
  } else if (status === 404) {
    router.push({ name: '404' });
  }

  if (errors && status === 422) {
    Object.keys(errors)
      .forEach((key) => store.commit('error/add', {
        key,
        message: errors[key][0],
      }));
  }

  return Promise.reject(error);
}

export {
  onRequestFulFilled,
  onRequestRejected,
  onResponseFulFilled,
  onResponseRejected,
};
