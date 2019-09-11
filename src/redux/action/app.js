import { createActions } from 'redux-actions';
import actionTypes from '../actionTypes';
import {getUserInfo} from "../../services/common";

export default createActions({
  [actionTypes.APP.GET_USER_INFO]: () => {
    return getUserInfo();
  },
  [actionTypes.APP.SET_APP_LOADED]: bool => bool,
});
