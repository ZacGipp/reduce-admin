/**
 * Created by Zed on 2019/8/5.
 */
import combineReducers from "redux/src/combineReducers";
import app from "./modules/app";
import account from "./modules/account";
import admin from "./modules/admin";

export default combineReducers({
  app,
  account,
  admin,
});
