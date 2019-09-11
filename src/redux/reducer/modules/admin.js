/**
 * Created by Zed on 2019/8/5.
 */
import { handleActions } from 'redux-actions';
import actionTypes from '../../actionTypes';
import configMenu from '../../../router/menuMap';
import {filterAsyncRouter} from "../../../router/index";
import _ from 'lodash';

const initialState = {
  userPage: {},
};

export default handleActions({
  [actionTypes.ADMIN.GET_USER_PAGE]: {

    next(state, {payload = {}}) {
      return {
        ...state,
        userPage: payload,
      };
    },
    throw(state) {
      return state;
    },
  },
}, initialState);
