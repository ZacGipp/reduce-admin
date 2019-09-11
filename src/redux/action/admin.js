import { createActions } from 'redux-actions';
import actionTypes from '../actionTypes';
import {getRolePage} from "../../services/account";
import {getUserPage} from "../../services/admin";

export default createActions({
  [actionTypes.ADMIN.GET_USER_PAGE]: data => {
    return getUserPage(data);
  },
});
