/**
 * Created by Zed on 2019/8/9.
 */
import apiUrl from "./apiUrl";
import request from "../util/request";

export function getUserInfo() {
  return request({
    url: apiUrl.GET_USER_INFO,
  });
}

export function login(userInfo) {
  let {
    username,
    password,
    validateCode,
    validateCodeKey,
  } = userInfo;

  const validMark = '%jmake&';
  const formatKey = '@';
  const formatStr = validMark + formatKey + validMark;
  let loginName = username.trim();
  loginName = formatStr.replace(formatKey, loginName);
  password = formatStr.replace(formatKey, password);
  const data = {
    loginName,
    password
  };

  const token = sessionStorage.getItem('accessToken'); // 扫码登录时存下的accessToken
  return request({
    url: apiUrl.LOGIN,
    headers: {
      validateCode: validateCode,
      validateCodeKey: validateCodeKey,
      'AAA-Token': token || ''
    },
    data,
  });
}
