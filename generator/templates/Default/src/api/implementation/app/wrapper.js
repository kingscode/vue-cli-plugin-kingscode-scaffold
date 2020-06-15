import handle from './index';

async function get(url, params = {}) {
    const result = await handle.get(url, {
        params: params,
    });

    return result.data;
}

async function getPaginated(url, page = 1, perPage = 10, search, sortBy, descending, params) {
    const result = await handle.get(url, {
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

    return result.data;
}

async function post(url, data = {}, params = {}) {
    const result = await handle.post(url, data, {
        params: params,
    });

    /* Not all of our post requests will get a body back */
    if (result.data.data) return result.data;

    return result;
}

async function put(url, data = {}, params = {}) {
    const result = await handle.put(url, data, {
        params: params,
    });

    /* Not all of our post requests will get a body back */
    if (result.data.data) return result.data;

    return result;
}

function destroy(url, params = {}) {
    return handle.delete(url, {
        params: params,
    });
}

export {
    get,
    getPaginated,
    post,
    put,
    destroy,
};
