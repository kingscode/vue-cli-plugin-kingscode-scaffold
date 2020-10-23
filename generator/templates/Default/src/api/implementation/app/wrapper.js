import { get } from '@/api/implementation/app';
import { convertCamelToSnake } from '@/api/util/keyConverter.js';

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
    params.sortBy = convertCamelToSnake(sortBy);
  }
  if (typeof descending !== 'undefined') {
    params.desc = descending ? '1' : '0';
  }

  return get(url, {
    params: {
      page,
      perPage,
      ...params,
    },
  });
}

export {
  getPaginated,
};
