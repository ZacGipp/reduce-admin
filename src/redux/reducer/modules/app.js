/**
 * Created by Zed on 2019/8/5.
 */
import { handleActions } from 'redux-actions';
import actionTypes from '../../actionTypes';
import configMenu from '../../../router/menuMap';
import {filterAsyncRouter} from "../../../router/index";
import _ from 'lodash';

const initialState = {
  userInfo: {},
  appLoaded: false,
  menuMap: [],
};

export default handleActions({
  [actionTypes.APP.GET_USER_INFO]: {

    next(state, {payload = {}}) {
      const {urls = {}, type} = payload;
      // 此处通过用户信息接口的urls、type字段控制访问者可访问的路由数组
      // type === 1时为金麦客超级管理员，urls为空，此时返回所有路由
      let menuMap = (type !== 1 && _.isEmpty(urls)) ? [] : filterAsyncRouter(_.cloneDeep(configMenu), urls);
      return {
        ...state,
        userInfo: payload,
        menuMap,
      };
    },
    throw(state) {
      return state;
    },
  },
  [actionTypes.APP.SET_APP_LOADED]: {
    next(state, {payload}) {
      return {
        ...state,
        appLoaded: payload,
      };
    },
    throw(state) {
      return state;
    },
  },
}, initialState);
