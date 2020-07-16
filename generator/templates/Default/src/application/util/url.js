const fragmentRegExp = new RegExp(`[\\#&]${key}=([^&#]*)`);

function getFragment(key, defaultValue = '') {
    const result = fragmentRegExp.exec(location.hash);

    if (result && result.length >= 2) {
        return decodeURIComponent(result[1]);
    }

    return defaultValue;
}

export {
    getFragment,
};
