/**
 * Created by Zed on 2019/8/9.
 */
import apiUrl from "./apiUrl";
import request from "../util/request";

// 用户列表
export function getUserPage(data) {
  return request({
    url: apiUrl.ADMIN.USER_LIST,
    data,
  });
}
