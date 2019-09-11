/**
 * 后台接口api
 * Created by Zed on 2019/8/9.
 */

export default {
  // 登录
  LOGIN: 'admin/login',
  // 登出
  LOGOUT: 'admin/logout',
  // 用户信息
  GET_USER_INFO: 'admin/info',

  // 账号管理
  ACCOUNT: {
    ALL_ROLE_LIST: 'system/role/page', // 所有角色列表
    ROLE_DELETE: 'system/role/delete/', //角色删除
    FORCE_DELETE_ROLE: 'system/role/forceDelete/', //强制删除角色
    ROLE_MODIFY: 'system/role/modify', //角色修改
    RESOURCE_TREE_ROLE: 'system/role/resourceTree/', //根据id获取资源树
    RESOURCE_TREE_DELETE: 'system/role/resourceModify',
    ROLE_SAVE_CHANNEL: 'system/role/saveChannel',
    ROLE_CHANNEL_LIST: 'system/role/channelList/', // 根据角色id获取渠道列表
    ROLE_GROUP_LIST: 'system/role/groupList/',
    ROLE_SAVE_USER_GROUP: 'system/role/saveUserGroup',
  },

  // 管理员列表
  ADMIN: {
    USER_LIST: 'system/user/page', // 用户列表
  },

  // 查询共享机型列表
  CHANNEL_SHARE_CHANNEL_LIST: 'admin/channel/shareChannelList',
};
