const TokenKey = 'token'

/**
 * set user info to session
 *
 * @export
 * @param {Object} data
 * @return {void}
 */
export function setUserInfo(data) {
  sessionStorage.setItem('userInfo', JSON.stringify(data))
}

/**
 * set token to session
 *
 * @export
 * @param {string} token
 * @return {void}
 */
export function setToken(token) {
  sessionStorage.setItem(TokenKey, token)
}

/**
 * get the userinfo
 *
 * @export
 * @return {Object}
 */
export function getUserInfo() {
  return sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
}

export function removeToken () {
  return sessionStorage.removeItem(TokenKey)
}

export function removeUserInfo () {
  return sessionStorage.removeItem('userInfo')
}
