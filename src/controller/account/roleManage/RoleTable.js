/**
 * Created by Zed on 2019/8/21.
 */
import React from "react";
import {connect} from "react-redux";
import accountAction from "../../../redux/action/account";
import Const from "../../../util/Const";
import BaseTablePage from "../../../component/common/BaseTablePage";
import {Button} from 'antd';
import EditPage from "./EditPage";
import {getShareChannels, roleDelete} from "../../../services/account";
import AdminTable from "./AdminTable";

@connect((state, props) => {
    return {
      rolePage: state.account.rolePage,
    };
  },
  {
    getRolePage: accountAction.getRolePage
  })
export default class RoleTable extends BaseTablePage {

  tableAction = data => this.props.getRolePage(data);
  tableData = () => this.props.rolePage;
  deleteFun = roleDelete;

  state = {
    columns: [
      {columnKey: 'id', label: 'id', minWidth: 60, sortable: true},
      {columnKey: 'roleName', label: '角色名称', minWidth: 60, sortable: true},
      {columnKey: 'description', label: '描述', minWidth: 60},
      {columnKey: 'userCount', label: '账号数', minWidth: 60, sortable: true},
      {columnKey: 'createName', label: '创建者', minWidth: 60, inDetail: true},
      {columnKey: 'createTime', label: '创建日期', minWidth: 120, inDetail: true},
      {
        label: Const.TABLE_BTN_TITLE, buttons: [
          {label: '编辑', type: 'edit'},
          {label: '删除', type: 'del', confirmable: true},
          {label: '授权', type: 'auth'},
          {label: '管理员列表', type: 'admin'}
        ]
      }
    ],
    tableSearchColumns: [
      {column: 'roleName', label: '请输入角色名称', type: 'input'},
    ],
  };

  topButtonHtml = () => {
    return <div className="table_searchContainer">
      <Button
        className="table_searchItem"
        type="primary"
        onClick={() => {
          this.goPage('EditPage', {formData: {test: 123}});
        }}>添加</Button>

    </div>;
  };

  handelAdmin = row => {
    this.goPage('AdminTable', {formData: row});
  };

}

