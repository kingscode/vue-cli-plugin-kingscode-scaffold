import handle from './index';

/**
 * @param url
 * @param page
 * @param perPage
 * @param search
 * @param sortBy
 * @param descending
 * @param params
 * @return {Promise<AxiosResponse>}
 */
function getPaginated(url, page = 1, perPage = 10, search, sortBy, descending, params) {
    return handle.get(url, {
        params: {
            page: page,
            perPage: perPage,
            /* undefined to exclude them out of the request */
            search: search ? search : undefined,
            sortBy: sortBy ? sortBy : undefined,
            desc: typeof descending === 'undefined' ? undefined : (descending ? '1' : '0'),
            ...params,
        },
    });
}

export {
    getPaginated,
};
