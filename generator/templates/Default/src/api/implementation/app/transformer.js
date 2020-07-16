import {camelToSnake, snakeToCamel} from '../../util/keyConverter';
import objectToFormData from '../../util/objectToFormDataConverter.js';
import Qs from 'qs';

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
 * @param data
 * @return {FormData}
 */
function transformRequest(data) {
    if (data) {
        data = camelToSnake(data);
    }

    return objectToFormData(data);
}

function transformParams(params) {
    return Qs.stringify(camelToSnake(params));
}

export {
    transformResponse,
    transformRequest,
    transformParams,
};
