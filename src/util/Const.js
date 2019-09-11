/**
 * Created by Zed on 2019/8/7.
 */
import Path from "../router/path";

export default {
  // 服务器api域名
  BASE_API: process.env.BASE_API,
  // 登陆前url记录key
  BEFORE_LOGIN_URL_KEY: "BEFORE_LOGIN_URL_KEY",
  // 不获取用户信息页面白名单
  DO_NOT_GET_USER_INFO_WITH_LIST: [
    Path.LOGIN,
  ],

  // 服务器错误状态
  HTTP_CODE: {
    SUCCESS: 2000,
    NEED_LOGIN: 1004,
    NEED_BINDING: 403,
  },

  // 事件类型
  EVENT: {
    EVENT_WINDOW_HASH_CHANGE: 'EVENT_WINDOW_HASH_CHANGE', // 监听url hash变化
    SIDEBAR_PATH_CHANGE: 'SIDEBAR_PATH_CHANGE', // 侧边菜单栏监听路径变化
  },

  // 7天免输入账号密码白名单
  LOGIN_WHITE_NAME_LIST: [
    '13086667075',
    '18602280013',
    'zhangguangpu'
  ],
  // 表格操作栏title
  TABLE_BTN_TITLE: '操作',

  // 角色类型
  ROLE: {
    JMAKE: '金麦客',
    SALES: '代理商',
    MANUFACTURER: '渠道方',
    OPERATOR: '运营方',
    BRAND: '厂牌方',
    LIST: [
      { value: 1, label: '金麦客' },
      { value: 2, label: '代理商' },
      { value: 3, label: '渠道方' },
      { value: 4, label: '运营方' },
      { value: 5, label: '厂牌方' },
    ]
  },

};
