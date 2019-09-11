import NavUtils from "./NavUtils";
import Path from '../router/path';
import {setSession} from "./ComUtils";

/**
 * 页面相关功能，包括但不限于 页面跳转，路径url相关，页面滚动（仅限于依靠body滚动）
 */
export default class PageUtils {

  /**
   * 设置页面标题
   * @param title
   */
  static setTitle(title) {
    document.title = title;
  }

  /**
   * 跳转到新页面
   * @param url
   * @param param
   */
  static linkTo(url, param) {
    NavUtils.linkTo(PageUtils.handleUrlParam(url, param));
  }

  /**
   * 以刷新方式打开页面
   * @param url
   * @param param
   */
  static refreshTo(url, param) {
    window.location.href = PageUtils.handleUrlParam(url, param);
  }

  /**
   * 替换当前路径到登录
   */
  static replaceToLogin(remember = true) {
    if (remember && !PageUtils.pathEqual(Path.LOGIN)) {
      setSession("beforeLoginUrl", PageUtils.currentPath() + window.location.search);
    }
    PageUtils.replace(Path.LOGIN);
  }

  static redirectToHome() {
    PageUtils.linkTo(Path.HOME);
  }

  /**
   * 回退到上页
   */
  static back() {
    NavUtils.back();
  }

  /**
   * 替换当前url
   * @param path
   * @param param
   */
  static replace(path, param) {
    NavUtils.replace(PageUtils.handleUrlParam(path, param));
  }

  /**
   * 替换当前url中所有参数，用param替代
   * @param param
   */
  static replaceParam(param) {
    let search = {};
    if (window.location.search) {
      window.location.search.substr(1).split("&").map(s => search[s.split("=")[0]] = s.split("=")[1]);
    }
    const paramMerge = {...search, ...param};
    window.history.replaceState({}, "", window.location.href.split("?")[0] + `?${Object.keys(paramMerge).map(key => key + "=" + paramMerge[key]).join("&")}`);
  }

  /**
   * 组装url与参数对象
   * @param url
   * @param param
   * @returns {*}
   */
  static handleUrlParam = (url, param) => {
    if (param) {
      let paramStr = "";
      Object.keys(param).forEach(key => paramStr += "&" + key + "=" + param[key]);
      if (url.indexOf("?") >= 0) {
        url += paramStr;
      } else {
        url += "?" + paramStr.substr(1);
      }
    }
    return url;
  };

  /**
   * 获取url hash
   * @returns {string}
   */
  static pathHash = () => {
    return window.location.hash.replace(/#/g, "");
  };

  /**
   * 设置url hash
   * @param hash
   */
  static setHash = hash => {
    if (PageUtils.pathHash() !== hash) {
      window.location.hash = hash;
    }
  };

  static goHashPage = (hash, params) => {
    if (PageUtils.pathHash() !== hash) {
      const url = PageUtils.currentPath();
      NavUtils.linkTo(PageUtils.handleUrlParam(url, params) + '#' + hash);
    }
  };

  static cleanHash = () => {
    window.history.replaceState({}, "", window.location.href.split("#")[0]);
  };

  /**
   * 当前路径是否等于传入路径
   * @param path
   * @returns {boolean}
   */
  static pathEqual = path => {
    return window.location.pathname === path;
  };

  static hashEqual = hash => {
    return PageUtils.pathHash() === hash;
  };

  /**
   * 当前路径
   * @returns {string}
   */
  static currentPath = () => {
    return window.location.pathname;
  };

}

