import dayjs from '../../plugins/dayJs.js';

export default function handleTooManyRequestsError(result) {
    const timestamp = result.headers['x-ratelimit-reset'] * 1000;
    const minutes = dayjs(timestamp).diff(dayjs(), 'minute') || 15;
    return {
        message: `Je hebt te vaak een foutieve login poging gehad. Probeer het over ${minutes} minuten opnieuw.`,
        success: false,
    };
}
