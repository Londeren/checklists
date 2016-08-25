export function setAuthToken(getStore, options = {}) {
  const {authUser: {token}} = getStore();

  return Object.assign({}, options, {
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`
    }
  });
}