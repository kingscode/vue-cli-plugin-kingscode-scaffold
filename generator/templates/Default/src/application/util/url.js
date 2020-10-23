function getFragment(key, defaultValue = '') {
  const fragmentRegExp = new RegExp(`[\\#&]${key}=([^&#]*)`);
  const result = fragmentRegExp.exec(window.location.hash);

  if (result && result.length >= 2) {
    return decodeURIComponent(result[1]);
  }

  return defaultValue;
}

export {
  getFragment,
};
