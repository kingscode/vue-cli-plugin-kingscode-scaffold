import {camelToSnake, snakeToCamel} from '../../util/keyConverter';
import objectToFormData from '../../util/objectToFormDataConverter.js';
import Qs from 'qs';
import Model from '../../../application/models/model.js';

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
        data = data.mapForRequest();
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
