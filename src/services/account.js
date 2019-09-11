/**
 * Created by Zed on 2019/8/9.
 */
import apiUrl from "./apiUrl";
import request from "../util/request";

// 角色列表
export function getRolePage(data) {
  return request({
    url: apiUrl.ACCOUNT.ALL_ROLE_LIST,
    data,
  });
}

// 角色修改
export function roleModify(data) {
  return request({
    url: apiUrl.ACCOUNT.ROLE_MODIFY,
    data,
  });
}

// 角色删除
export function roleDelete(data) {
  return request({
    url: apiUrl.ACCOUNT.ROLE_DELETE + data.id,
  });
}

// 查询共享机型列表
export function getShareChannels(data) {
  return request({
    url: apiUrl.CHANNEL_SHARE_CHANNEL_LIST,
    data,
  });
}
