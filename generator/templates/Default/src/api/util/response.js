import dayjs from '../../plugins/dayJs.js';

function getRateLimitMinutes(response, defaultMinutes = 15) {
  const remainingMilliseconds = (+response.headers['retry-after']) * 1000;
  const unlockTime = Date.now() + remainingMilliseconds;

  return dayjs(unlockTime)
    .diff(dayjs(), 'minute') || defaultMinutes;
}

export {
  getRateLimitMinutes,
};
