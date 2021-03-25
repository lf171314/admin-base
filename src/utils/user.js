import Storage from './storage'
import { accessToken, userInfo } from './constants'

export function getUserInfo() {
  return Storage.get(userInfo)
}

export function setUserInfo(val = '') {
  return Storage.set(userInfo, JSON.stringify(val))
}

export function clearUserInfo() {
  return Storage.remove(userInfo)
}

export function setToken(token) {
  return Storage.set(accessToken, JSON.stringify(token))
}

export function getToken() {
  return Storage.get(accessToken)
}

export function removeToken() {
  return Storage.remove(accessToken)
}
