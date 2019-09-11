/**
 * Created by Zed on 2019/8/9.
 */
import Cookies from 'js-cookie';
import Path from "../router/path";
import Const from "./Const";

const TokenKey = 'Admin-Token';
const LoginFormKey = 'userInfo';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function setLoginForm(loginForm) {
  Cookies.set(LoginFormKey, loginForm, { expires: 7 });
}

export function getLoginForm() {
  return Cookies.get(LoginFormKey);
}


// 记忆路径函数封装
export function rememberPath() {
  // 如果路径不是login登录，则将路径存登陆前url记录key的cookie
  if (window.location.pathname.indexOf(Path.LOGIN) < 0) {
    Cookies.set(Const.BEFORE_LOGIN_URL_KEY, window.location.pathname);
  }
}

// 获取记忆路径
export function getRememberedPath() {
  return Cookies.get(Const.BEFORE_LOGIN_URL_KEY);
}
