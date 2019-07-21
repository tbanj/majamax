import Raven from 'raven-js';
function init() {
    Raven.config('https://df36aac02dae43189ce073d765f59f6b@sentry.io/1509152',
        {
            release: '1-0-0',
            environment: 'development-test'
        }).install()
}

function log(error) {
    Raven.captureException(error);
}

export default {
    init,
    log
}