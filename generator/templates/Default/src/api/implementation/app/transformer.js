import Qs from 'qs';
import Model from '../../../application/models/model.js';
import { camelToSnake, snakeToCamel } from '../../util/keyConverter';
import objectToFormData from '../../util/objectToFormDataConverter.js';

/**
 * @param response
 * @returns {{}}
 */
function transformResponse(response) {
  if (typeof response === 'string' && response.length > 0) {
    const result = JSON.parse(response);
    return snakeToCamel(result);
  }

  if (!response) {
    return {};
  }

  return response;
}

/**
 * @param data {undefined|*}
 * @return {FormData}
 */
function transformRequest(data) {
  if (data instanceof Model) {
    const isPutRequest = data._method === 'put';

    data = data.mapForRequest();

    if (isPutRequest) {
      data._method = 'put';
    }
  }

  if (data) {
    data = camelToSnake(data);
    data = objectToFormData(data);
  }

  return data;
}

function transformParams(params) {
  return Qs.stringify(camelToSnake(params));
}

export {
  transformResponse,
  transformRequest,
  transformParams,
};
