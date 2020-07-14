import dayjs from 'generator/templates/Default/src/plugins/dayJs.js';

function getRateLimitMinutes(response, defaultMinutes = 15) {
    const timestamp = response.headers['x-ratelimit-reset'] * 1000;

    return dayjs(timestamp).diff(dayjs(), 'minute') || defaultMinutes;
}

export {
    getRateLimitMinutes,
};
