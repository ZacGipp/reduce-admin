/**
 * Created by Zed on 2019/8/5.
 */
import { handleActions } from 'redux-actions';
import actionTypes from '../../actionTypes';
import configMenu from '../../../router/menuMap';
import {filterAsyncRouter} from "../../../router/index";
import _ from 'lodash';

const initialState = {
  rolePage: {},
};

export default handleActions({
  [actionTypes.ACCOUNT.GET_ROLE_PAGE]: {

    next(state, {payload = {}}) {
      return {
        ...state,
        rolePage: payload,
      };
    },
    throw(state) {
      return state;
    },
  },
}, initialState);
