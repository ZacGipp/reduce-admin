import Path from "./path";
import RoleList from "../controller/account/roleManage/RoleList";
import AdminList from "../controller/account/AdminList/AdminList";
import AuthList from "../controller/account/AuthList";

/**
 * Created by Zed on 2019/8/7.
 */

export default [
  {
    path: Path.ACCOUNT.ROOT,
    name: '账号管理',
    icon: 'lock',
    children: [
      {path: Path.ACCOUNT.ROLE, name: '角色管理', component: RoleList},
      {path: Path.ACCOUNT.ADMIN_LIST, name: '管理员列表', component: AdminList},
      {path: Path.ACCOUNT.AUTH_MANAGE, name: '权限管理', component: AuthList}
    ]
  },
  {
    path: Path.SALES.ROOT,
    name: '代理商管理',
    icon: 'lock',
    children: [
      {path: Path.SALES.STATISTICS, name: '统计', component: RoleList},
      // {path: 'shareUser', component: shareUser, name: '共享设备明细'},
      // {path: 'list', component: salesList, name: '下级代理商管理'},
      // {path: 'team', component: salesTeamManage, name: '虚拟组管理'},
      // {path: 'device', component: salesDeviceManage, name: '设备列表管理'},
      // {path: 'order', component: salesOrderManage, name: '订单管理'},
      // {path: 'settlement', component: settlementManage, name: '结算列表'}
    ]
  },
  {
    path: Path.MANUFACTURER.ROOT,
    name: '渠道方管理',
    icon: 'lock',
    children: [
      {path: Path.MANUFACTURER.LIST, name: '渠道方用户', component: RoleList},
    ]
  },
];
