/******************************************/
/************** 封装axios请求 **************/
/******************************************/
import axios from 'axios';
import {
    getToken,
    setToken,
  rememberPath
} from './auth';
import Const from './Const';
import Path from "../router/path";
import CommonMsg from "../component/layout/CommonMsg";

// 请求超时
axios.defaults.timeout = 30000;
axios.defaults.baseURL = Const.BASE_API;

// request拦截器
axios.interceptors.request.use(
  config => {
    let {data, url} = config;

    const token = getToken();
    // 如果有token直接在headers中添加token
    if (token) {
      config.headers['token'] = token;
    }

    if (data) {
      const {urlJoin} = data;

      if (urlJoin) {
        config.url = url + urlJoin;
        delete data.urlJoin;
        config.data = data;
      }
    }

    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    CommonMsg.error(error.message);
    Promise.reject(error);
  }
);

// response 拦截器
axios.interceptors.response.use(
  response => Promise.resolve(response),
  error => Promise.reject(error)
);

export default (config, success, error) => {
  const {url, method = 'post', data = {}, headers = {}} = config;
  return axios({
    url,
    method,
    data,
    headers,
  }).then(
    response => {
      const {msg, status, data, result} = response.data;

      if (data && data.token) setToken(data.token);

      if (status === Const.HTTP_CODE.NEED_LOGIN) {
        rememberPath();
        window.location.href = Path.LOGIN;
      } else if (status === Const.HTTP_CODE.NEED_BINDING) {
        rememberPath();
        if (location.pathname.indexOf('/binding') < 0)
          location.href = '/login?binding=true'; // 当调到login页面有binding这个search的时候表示需要绑定，将扫码tabs改为绑定tabs
      } else if (status !== Const.HTTP_CODE.SUCCESS) {
        CommonMsg.error(msg || '操作失败');
        typeof error === 'function' && error(msg);
        return Promise.reject(msg);
      } else {
        const res = data || result || '';
        typeof success === 'function' && success(res);
        return Promise.resolve(res);
      }
    },
    error => {
      console.log('err: ' + error); // for debug
      CommonMsg.error(error.message);
      return Promise.reject(error);
    }
  );
};
