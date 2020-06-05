import {snakeToCamel} from '../../../util/keyConverter';

/**
 * @param response {}
 * @returns {{}, string}
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

export {
    transformResponse,
};
