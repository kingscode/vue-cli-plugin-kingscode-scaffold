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
function getPaginated(url, page = 1, perPage = 10, search, sortBy, descending, params = {}) {
  if (search) {
    params.search = search;
  }
  if (sortBy) {
    params.sortBy = sortBy;
  }
  if (typeof descending !== 'undefined') {
    params.desc = descending ? '1' : '0';
  }

  return handle.get(url, {
    params: {
      page: page,
      perPage: perPage,
      ...params,
    },
  });
}

export {
  getPaginated,
};
