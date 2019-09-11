import { createActions } from 'redux-actions';
import actionTypes from '../actionTypes';
import {getRolePage} from "../../services/account";

export default createActions({
  [actionTypes.ACCOUNT.GET_ROLE_PAGE]: data => {
    return getRolePage(data);
  },
});
